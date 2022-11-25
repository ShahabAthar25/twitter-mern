const createError = require("http-errors");

const User = require("../models/User");
const Post = require("../models/Post");

module.exports = {
  getBookmarks: async (req, res, next) => {
    try {
      res.json("Hello World");
    } catch (error) {
      next(error);
    }
  },
  createBookmark: async (req, res, next) => {
    try {
      const { post } = req.body;
      if (!post) throw createError.BadRequest('"Post" is required');

      const postObj = await Post.findById(post);
      if (!postObj) throw createError.NotFound("Post Not Found.");

      await User.findByIdAndUpdate(req.payload.id, {
        $push: { bookmarks: post },
      });

      res.json(postObj);
    } catch (error) {
      next(error);
    }
  },
  deleteBookmark: async (req, res, next) => {
    try {
      res.json("Hello World");
    } catch (error) {
      next(error);
    }
  },
};
