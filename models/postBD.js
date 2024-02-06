import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {String, required: true},
    content: {String, required: true}
})

const Post = new mongoose.model("Post", postSchema)

export default Post