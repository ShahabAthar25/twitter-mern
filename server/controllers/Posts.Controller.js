const createError = require("http-errors");
const Post = require("../models/Post");
const { postSchema } = require("../helpers/ValidationSchema");

module.exports = {
  getAllPosts: async (req, res, next) => {
    try {
      const posts = await Post.find();

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
      res.send("Hello, World!");
    } catch (error) {
      next(error);
    }
  },
  deletePost: async (req, res, next) => {
    try {
      res.send("Hello, World!");
    } catch (error) {
      next(error);
    }
  },
};
