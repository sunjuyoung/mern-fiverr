import express from "express";
import { Fn } from "../controller/gig.controller.js";

const router = express.Router();

router.get("/test", Fn);

export default router;
