import express from "express";
import {
  createGift,
  deleteGift,
  getGift,
  getGiftById,
  getGiftByUser,
  updateGift,
} from "../controller/gift.controller.js";
import { verifyAdmin, verifyToken } from "../services/verifyService.js";

const router = express.Router();

router.get("/detail/:id", getGiftById);
router.get("/", getGift);
router.delete("/:id", deleteGift);
router.get("/user/:userId", getGiftByUser);
router.post("/", verifyAdmin, createGift);
router.patch("/:id", verifyAdmin, updateGift);

export default router;
