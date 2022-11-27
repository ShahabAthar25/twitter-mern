const HashTag = require("../models/HashTag");
const Post = require("../models/Post");

module.exports = {
  getHashtags: async (req, res, next) => {
    try {
      const hashTags = await HashTag.find().select("name createdAt -_id");

      res.json(hashTags);
    } catch (error) {
      next(error);
    }
  },
  getHashtag: async (req, res, next) => {
    try {
      const { name } = req.query;

      const posts = await Post.find({ hashTags: name });

      res.json(posts);
    } catch (error) {
      next(error);
    }
  },
  getTrending: async (req, res, next) => {
    try {
      const hashTags = await HashTag.find()
        .select("name createdAt -_id")
        .limit(10);

      let trending = [];

      for (const hashTag of hashTags) {
        const noOfPosts = await Post.countDocuments({ hashTags: hashTag.name });
        trending.push({
          name: hashTag.name,
          posts: noOfPosts,
        });
      }

      trending.sort((a, b) => parseFloat(b.posts) - parseFloat(a.posts));

      res.json(trending);
    } catch (error) {
      next(error);
    }
  },
};
