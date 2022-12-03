import express from "express";
import authService from "../service/authService.js";
import httpHelper from "../utils/httpHelper.js";
import { verifyBirthDate } from "../utils/birthDateVerification.js";

const route = express.Router();

route.post("/login", (req, res) => {
  try {
    authService
      .login(req.body?.email || null, req.body?.password || null)
      .then((result) => {
        httpHelper.success(res, result);
      })
      .catch((err) => httpHelper.error(res, err));
  } catch (e) {
    httpHelper.error(res, e);
  }
});

route.post("/id-scan", (req, res) => {
  try {
    authService
      .idScan(req.body.downloadURL)
      .then((result) => {
        const isVerified = verifyBirthDate(result[0].description);
        httpHelper.success(res, isVerified);
      })
      .catch((err) => httpHelper.error(res, err));
  } catch (e) {
    httpHelper.error(res, e);
  }
});

export default route;
