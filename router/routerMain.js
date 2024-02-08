import express from "express";
import feedRouter from "./feedRouter.js"
import loginRouter from './loginRouter.js'

const router = express.Router();

router.use('/feed', feedRouter);
router.use('/auth', loginRouter)

export default router;
