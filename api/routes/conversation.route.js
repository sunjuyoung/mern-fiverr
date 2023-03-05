import express from "express";
import {
  getConversations,
  createConversation,
  getConversation,
  updateConversation,
} from "../controller/conversation.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", verifyToken, getConversations);
router.post("/", verifyToken, createConversation);
router.get("/single/:id", verifyToken, getConversation);
router.put("/:id", verifyToken, updateConversation);

export default router;
