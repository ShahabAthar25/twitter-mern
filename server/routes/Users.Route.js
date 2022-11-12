const router = require("express").Router();

const controller = require("../controllers/Users.Controller");

router.get("/:id", controller.getUser);
router.get("/search", controller.searchUsers);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);
router.put("/:id/follow", controller.followUser);
router.put("/:id/unfollow", controller.unFollowUser);

module.exports = router;
