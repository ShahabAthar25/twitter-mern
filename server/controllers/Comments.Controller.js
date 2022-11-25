const createError = require("http-errors");

const Comment = require("../models/Comment");
const { commentSchema } = require("../helpers/ValidationSchema");
const User = require("../models/User");
const setOwner = require("../helpers/setOwner");

module.exports = {
  getComments: async (req, res, next) => {
    try {
      const { id } = req.params;

      const comments = JSON.parse(
        JSON.stringify(await Comment.find({ postId: id }))
      );

      for (const comment of comments) {
        await setOwner(comment);
      }

      res.json(comments);
    } catch (error) {
      next(error);
    }
  },
  createComment: async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await commentSchema.validateAsync(req.body);

      result.postId = id;

      const newComment = new Comment(result);
      const comment = await newComment.save(req);

      res.json(comment);
    } catch (error) {
      next(error);
    }
  },
  deleteComment: async (req, res, next) => {
    try {
      const { id } = req.params;
      const comment = await Comment.findById(id);

      if (req.payload.id !== comment.owner) throw createError.Forbidden();

      await comment.deleteOne();

      res.json("Comment Deleted");
    } catch (error) {
      next(error);
    }
  },
};
