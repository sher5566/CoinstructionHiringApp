import express from "express";
import {
  createWorkforce,
  getWorkforce,
  getWorkforcelisting,
} from "../controller/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();


router.post("/createworkforce", verifyToken, createWorkforce);

router.get("/getworkforce/:id", getWorkforce);
router.get("/get" , getWorkforcelisting);


export default router;
