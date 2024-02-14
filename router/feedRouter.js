import express from 'express';
import { getAllPosts, buildPost, deletePost, patchPost } from '../controller/feedController.js';
import { validTitle, validContent } from "../service/validators.js";
import upload from '../config/multer.js';

const router = express.Router();

router.get("/post", getAllPosts);
router.post("/post", upload.single("file"),[validTitle, validContent], buildPost);
router.delete('/post/:id', deletePost);
router.patch('/post/:id',upload.single("file"), patchPost);

export default router;
