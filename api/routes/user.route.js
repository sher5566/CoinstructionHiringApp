import express from "express";
import {
  deleteUser,
  test,
  updateUser,
  getUserListings,
  getUser,
  getAllUsers,
  deleteUserFromall,
} from "../controller/user.controller.js";

import { verifyToken, isAdmin } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/users", verifyToken, getAllUsers);
router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:id", verifyToken, getUserListings);
router.get("/:id", verifyToken, getUser);
router.delete("/delete/:userId", isAdmin, deleteUserFromall);

export default router;
