import express from "express";
import multer from "multer";
import { registration, getParticipants, uploadFile } from "./controller";

function getCommonRoutes() {
  const router = express.Router();

  router.post("/registration", registration);
  router.get("/get-participants", getParticipants);
  router.post("/contact", getParticipants);
  router.post("/upload", multer().single("file"), uploadFile);
  return router;
}

export default getCommonRoutes;
