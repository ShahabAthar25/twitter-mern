const router = require("express").Router();

const controller = require("../controllers/Bookmarks.Controller");

router.get("/", controller.getBookmarks);
router.post("/", controller.bookmark);

module.exports = router;
