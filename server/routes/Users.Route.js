const router = require("express").Router();

const controller = require("../controllers/Users.Controller");

router.get("/search", controller.searchUsers);
router.get("/whoami", controller.whoami);
router.get("/:id", controller.getUser);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);
router.put("/:id/follow", controller.followUser);

module.exports = router;
