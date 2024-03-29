import fs from "fs";
import {
  createPost,
  deletePostById,
  getPostbyID,
  getPosts,
} from "../models/postBD.js";
import { validationResult } from "express-validator";
import { getUserBySessionToken } from "../models/userBD.js";

async function getAllPosts(req, res, next) {
  try {
    const data = await getPosts();
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

async function buildPost(req, res, next) {
  try {
    const { title, content } = req.body;
    const file = req.file;

    const sessionToken = req.cookies["AUTH-API"];

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      if (file) {
        fs.unlinkSync(file.path);
      }
      throw errors.array();
    }

    const user = await getUserBySessionToken(sessionToken);

    const post = await createPost({
      title,
      content,
      src: file.path,
      user: user._id
    });

    return res.status(201).json(post);
  } catch (error) {
    next(error);
  }
}

async function deletePost(req, res, next) {
  try {
    const id = req.params.id;

    const data = await deletePostById(id);

    if (!data) {
      const error = new Error("Post não encontrado");
      error.status = 404;
      throw error;
    }

    fs.unlinkSync(data.src);

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function patchPost(req, res, next) {
  try {
    const id = req.params.id;
    const { title, content } = req.body;
    const file = req.file;

    const data = await getPostbyID(id);

    if (!data) {
      const error = new Error("Post não encontrado");
      error.status = 404;
      throw error;
    }

    if (title) {
      data.title = title;
    }

    if (content) {
      data.content = content;
    }

    if (file) {
      fs.unlinkSync(data.src);
      data.src = file.path;
      console.log("asada");
    }

    await data.save();

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export { getAllPosts, buildPost, deletePost, patchPost };
