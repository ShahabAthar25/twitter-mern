const createError = require("http-errors");

const User = require("../models/User");
const Post = require("../models/Post");
const setOwner = require("../helpers/setOwner");

module.exports = {
  getBookmarks: async (req, res, next) => {
    try {
      const user = await User.findById(req.payload.id);

      result = [];

      for (const bookmark of user.bookmarks) {
        const post = JSON.parse(JSON.stringify(await Post.findById(bookmark)));
        await setOwner(post);

        result.push(post);
      }

      res.json(result);
    } catch (error) {
      next(error);
    }
  },
  bookmark: async (req, res, next) => {
    try {
      const user = await User.findById(req.payload.id);

      const { post } = req.body;
      if (!post) throw createError.BadRequest('"Post" is required');

      const postObj = await Post.findById(post);
      if (!postObj) throw createError.NotFound("Post Not Found.");

      if (!user.bookmarks.includes(post)) {
        await User.findByIdAndUpdate(req.payload.id, {
          $push: { bookmarks: post },
        });
        res.json(postObj);
      } else {
        await User.findByIdAndUpdate(req.payload.id, {
          $pull: { bookmarks: post },
        });
        res.json("Bookmark removed");
      }
    } catch (error) {
      next(error);
    }
  },
};
