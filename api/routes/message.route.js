import express from "express";
import { Fn } from "../controller/message.controller.js";

const router = express.Router();

router.get("/test", Fn);

export default router;