/* eslint-disable no-unused-vars */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import logger from "helper/logger";
import ApiError from "helper/functions/ApiError";
import db from "database";
import { getFileExtension } from "helper/functions/getFileExtension";
import { getRandomString } from "helper/functions/getRandomString";
import * as AWS from "aws-sdk";

/** @type {import("express").RequestHandler} */
export async function registration(req, res) {
  const data = req.body;

  const user = await db.user.create(data);
  res.send({ user });
}

/** @type {import("express").RequestHandler} */
export async function getParticipants(req, res) {
  const participants = await db.user.findAll();
  res.send({ participants });
}

// FILE UPLOAD //
AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

const s3 = new AWS.S3({
  credentials: {
    expired: false,
    expireTime: null,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
  region: process.env.S3_REGION,
});

const upload = (file) => {
  return new Promise((resolve) => {
    s3.upload(
      {
        Bucket: process.env.S3_BUCKET,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read",
      },
      null,
      (err, data) => {
        if (err) {
          throw new ApiError(err.message, 500);
        }
        resolve(data);
      },
    );
  });
};

/** @type {import("express").RequestHandler} */
export const uploadFile = async (req, res) => {
  const file_path = `${process.env.NODE_ENV}/${getRandomString()}.${getFileExtension(
    req.file.originalname,
  )}`;

  const uploaded_file = await upload({
    ...req.file,
    originalname: file_path,
  });

  const { Location } = uploaded_file;
  res.json({
    uploaded_file: {
      Location,
    },
  });
};
