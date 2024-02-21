import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    src: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export const PostModel = new mongoose.model("Post", postSchema)

/* Actions */
export const getPosts = () => PostModel.find()
export const getPostbyID = (id) => PostModel.findOne({_id: id})
export const createPost = (values) => new PostModel(values).save().then((user) => user.toObject());
export const deletePostById = (id) => PostModel.findOneAndDelete({ _id: id });
export const updatePostById = (id, values) => PostModel.findByIdAndUpdate(id, values);