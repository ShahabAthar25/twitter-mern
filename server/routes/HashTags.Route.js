const router = require("express").Router();

const controller = require("../controllers/HashTags.Controller");

router.get("/", controller.getHashtags);
router.get("/:id", controller.getHashtag);

module.exports = router;
