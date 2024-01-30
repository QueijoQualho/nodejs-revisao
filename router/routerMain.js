import express from "express";
import feedRouter from "./feedRouter.js"

const router = express.Router();

router.use('/feed',feedRouter);

export default router;
