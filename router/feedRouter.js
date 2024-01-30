import express from 'express';
import { getPosts, createPost, deletePost, patchPost } from '../controller/feedController.js';
import { validTitle, validContent } from "../service/validators.js"

const router = express.Router();

router.get("/posts", getPosts);
router.post("/post", [validTitle, validContent], createPost);
router.delete('/post/:id', deletePost)
router.patch('post/:id', patchPost)

export default router;
