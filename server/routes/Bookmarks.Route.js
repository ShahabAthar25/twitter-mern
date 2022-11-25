const router = require("express").Router();

const controller = require("../controllers/Bookmarks.Controller");
const { verifyAccessToken } = require("../helpers/JWTHelper");

router.get("/", verifyAccessToken, controller.getBookmarks);
router.post("/", verifyAccessToken, controller.createBookmark);
router.delete("/:id", verifyAccessToken, controller.deleteBookmark);

module.exports = router;
