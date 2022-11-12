const router = require("express").Router();

const controller = require("../controllers/Posts.Controller");
const { verifyAccessToken } = require("../helpers/JWTHelper");

router.get("/", controller.getAllPosts);
router.get("/:id", controller.getPost);
router.post("/", verifyAccessToken, controller.createPost);
router.put("/:id", verifyAccessToken, controller.updatePost);
router.delete("/:id", verifyAccessToken, controller.deletePost);

module.exports = router;
