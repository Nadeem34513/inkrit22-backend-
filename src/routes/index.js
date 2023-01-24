import express from "express";
import getCommonRoutes from "./common/router";

function getRoutes() {
  const router = express.Router();

  router.use("", getCommonRoutes());

  return router;
}

export default getRoutes;
