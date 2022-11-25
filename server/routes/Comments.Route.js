const router = require("express").Router();

const controller = require("../controllers/Comments.Controller");
const { verifyAccessToken } = require("../helpers/JWTHelper");

router.get("/:id", controller.getComments);
router.post("/:id", verifyAccessToken, controller.createComment);
router.delete(
  "/:postId/:commentId",
  verifyAccessToken,
  controller.deleteComment
);

module.exports = router;
