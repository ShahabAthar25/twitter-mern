const router = require("express").Router();

const controller = require("../controllers/Users.Controller");
const { verifyAccessToken } = require("../helpers/JWTHelper");

router.get("/search", controller.searchUsers);
router.get("/whoami", verifyAccessToken, controller.whoami);
router.get("/:id", controller.getUser);
router.put("/:id", verifyAccessToken, controller.updateUser);
router.delete("/:id", verifyAccessToken, controller.deleteUser);
router.put("/:id/follow", verifyAccessToken, controller.followUser);
router.put("/:id/unfollow", verifyAccessToken, controller.unFollowUser);

module.exports = router;
