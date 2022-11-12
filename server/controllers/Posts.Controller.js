module.exports = {
  getAllPosts: (req, res, next) => {
    try {
      res.send("Hello, World!");
    } catch (error) {
      next(error);
    }
  },
  getPost: (req, res, next) => {
    try {
      res.send("Hello, World!");
    } catch (error) {
      next(error);
    }
  },
  createPost: (req, res, next) => {
    try {
      res.send("Hello, World!");
    } catch (error) {
      next(error);
    }
  },
  updatePost: (req, res, next) => {
    try {
      res.send("Hello, World!");
    } catch (error) {
      next(error);
    }
  },
  deletePost: (req, res, next) => {
    try {
      res.send("Hello, World!");
    } catch (error) {
      next(error);
    }
  },
};
