const Post = require("../models/Post");

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
      res.send("Hello, World!");
    } catch (error) {
      next(error);
    }
  },
  createPost: async (req, res, next) => {
    try {
      res.send("Hello, World!");
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