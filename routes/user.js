import express from "express";
import {
  deleteUser,
  exchangeGift,
  getAllUser,
  updateUser,
} from "../controller/user.controller.js";
import { verifyAdmin, verifyToken } from "../services/verifyService.js";
const router = express.Router();

router.get("/", getAllUser);
router.delete("/", verifyAdmin, deleteUser);
router.patch("/:id", verifyAdmin, updateUser);
router.post("/exchange", exchangeGift);

export default router;
