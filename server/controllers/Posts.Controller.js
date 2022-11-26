const createError = require("http-errors");

const Post = require("../models/Post");
const HashTag = require("../models/HashTag");
const { postSchema } = require("../helpers/ValidationSchema");
const setOwner = require("../helpers/setOwner");
const getHashTags = require("../helpers/getHashtag");

module.exports = {
  getAllPosts: async (req, res, next) => {
    try {
      const posts = JSON.parse(
        JSON.stringify(await Post.find().sort({ createdAt: -1 }))
      );
      if (!posts) throw createError.NotFound();

      for (const post of posts) {
        await setOwner(post);
      }

      res.json(posts);
    } catch (error) {
      next(error);
    }
  },
  getPost: async (req, res, next) => {
    try {
      const { id } = req.params;
      const post = JSON.parse(JSON.stringify(await Post.findById(id)));
      if (!post) throw createError.NotFound();

      await setOwner(post);

      res.json(post);
    } catch (error) {
      next(error);
    }
  },
  createPost: async (req, res, next) => {
    try {
      const result = await postSchema.validateAsync(req.body);
      if (!result.body && !result.retweet) throw createError.BadRequest();

      result.hashTags = getHashTags(result.body);
      for (const hashTag of result.hashTags) {
        const hashTagExists = await HashTag.exists({ name: hashTag });
        if (!hashTagExists) {
          const newHashTag = new HashTag({ name: hashTag });
          await newHashTag.save();
        }
      }

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
      if (!post) throw createError.NotFound();

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

      const posts = JSON.parse(
        JSON.stringify(
          await Post.find({
            body: { $regex: new RegExp(q + ".*", "i") },
          })
        )
      );

      for (const post of posts) {
        await setOwner(post);
      }

      res.json(posts);
    } catch (error) {
      next(error);
    }
  },
};
