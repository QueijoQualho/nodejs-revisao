import fs from "fs";
import {
  createPost,
  deletePostById,
  getPostbyID,
  getPosts,
} from "../models/postBD.js";
import handleValidationErrors from "../service/validationUtils.js";

async function getAllPosts(req, res, next) {
  try {
    const data = await getPosts();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function buildPost(req, res, next) {
  try {
    const validationError = handleValidationErrors(req, res, next);

    if (validationError) {
      throw validationError;
    }

    const { title, content } = req.body;
    const file = req.file;

    const post = await createPost({
      title,
      content,
      src: file.path,
    });

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function deletePost(req, res, next) {
  try {
    const id = req.params.id;

    const data = await deletePostById(id);

    if (!data) {
      throw Error("Post não encontrado");
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
      throw Error("Post não encontrado");
    }

    if(title){
      data.title = title;
    }

    if(content){
      data.content = content;
    }

    if(file){
      fs.unlinkSync(data.src);
      data.src = file.path
      console.log("asada");
    }

    await data.save();

    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export { getAllPosts, buildPost, deletePost, patchPost };
