const router = require("express").Router();

const controller = require("../controllers/Comments.Controller");

router.get("/:id", controller.getComments);
router.post("/:id", controller.createComment);
router.delete("/:id", controller.deleteComment);

module.exports = router;
