import express from "express";
import feedRouter from "./feedRouter.js"
import loginRouter from './loginRouter.js'
import userRouter from './userRouter.js'

const router = express.Router();

router.use('/feed', feedRouter);
router.use('/auth', loginRouter)
router.use('/user', userRouter)

export default router;
