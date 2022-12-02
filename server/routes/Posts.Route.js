const router = require("express").Router();

const controller = require("../controllers/Posts.Controller");

router.get("/", controller.getAllPosts);
router.get("/search", controller.searchPosts);
router.get("/:id", controller.getPost);
router.post("/", controller.createPost);
router.put("/:id", controller.updatePost);
router.delete("/:id", controller.deletePost);

module.exports = router;
