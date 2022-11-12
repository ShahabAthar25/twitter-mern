const createError = require("http-errors");
const Post = require("../models/Post");
const { postSchema } = require("../helpers/ValidationSchema");

module.exports = {
  getAllPosts: async (req, res, next) => {
    try {
      const posts = await Post.find().sort({ createdAt: -1 });

      res.json(posts);
    } catch (error) {
      next(error);
    }
  },
  getPost: async (req, res, next) => {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);

      res.json(post);
    } catch (error) {
      next(error);
    }
  },
  createPost: async (req, res, next) => {
    try {
      const result = await postSchema.validateAsync(req.body);
      if (!result.body && !result.retweet) throw createError.BadRequest();

      const newPost = new Post(result);
      const post = await newPost.save(req);

      res.json(post);
    } catch (error) {
      next(error);
    }
  },
  updatePost: async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await postSchema.validateAsync(req.body);
      if (!result.body && !result.retweet) throw createError.BadRequest();

      const post = await Post.findById(id);

      const now = new Date();
      const thirtyMinutesAgo = new Date(now - 30 * 60000);

      if (post.createdAt < thirtyMinutesAgo)
        throw createError.Forbidden("Caanot update post after 30 minutes");

      if (req.payload.id != post.ownerId) throw createError.Forbidden();

      await post.updateOne({
        $set: result,
      });

      res.json("Post Updated");
    } catch (error) {
      next(error);
    }
  },
  deletePost: async (req, res, next) => {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);

      if (req.payload.id != post.ownerId) throw createError.Forbidden();

      await post.deleteOne();

      res.json("Post deleted");
    } catch (error) {
      next(error);
    }
  },
  searchPosts: async (req, res, next) => {
    try {
      const { q } = req.query;

      const posts = await Post.find({
        body: { $regex: new RegExp(q + ".*", "i") },
      });

      res.json(posts);
    } catch (error) {
      next(error);
    }
  },
};
