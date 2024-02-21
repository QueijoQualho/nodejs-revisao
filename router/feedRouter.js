import express from "express";
import {
  getAllPosts,
  buildPost,
  deletePost,
  patchPost,
} from "../controller/feedController.js";
import { validTitle, validContent } from "../service/validators.js";
import upload from "../config/multer.js";
import { isAuthenticated, isOwner } from "../service/tokenValidator.js";

const router = express.Router();

router.get("/", getAllPosts);

router.post(
  "/post",
  upload.single("file"),
  isAuthenticated,
  [validTitle, validContent],
  buildPost
);

router.delete("/post/:id", isAuthenticated, isOwner, deletePost);

router.patch(
  "/post/:id",
  upload.single("file"),
  isAuthenticated,
  isOwner,
  patchPost
);

export default router;
