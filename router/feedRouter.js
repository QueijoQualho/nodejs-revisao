import express from 'express'
import feedController from '../controller/feedController';

const router = express.Router();


router.get("/posts", feedController.getPosts)

export default router;