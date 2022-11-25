const createError = require("http-errors");

const Comment = require("../models/Comment");
const { commentSchema } = require("../helpers/ValidationSchema");
const User = require("../models/User");

module.exports = {
  getComments: async (req, res, next) => {
    try {
      const { id } = req.params;

      const comments = await Comment.find({ postId: id });

      res.json(comments);
    } catch (error) {
      next(error);
    }
  },
  createComment: async (req, res, next) => {
    try {
      res.json("Hello World");
    } catch (error) {
      next(error);
    }
  },
  deleteComment: async (req, res, next) => {
    try {
      res.json("Hello World");
    } catch (error) {
      next(error);
    }
  },
};
