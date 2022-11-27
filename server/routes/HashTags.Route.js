const router = require("express").Router();

const controller = require("../controllers/HashTags.Controller");

router.get("/", controller.getHashtags);
router.get("/one", controller.getHashtag);
router.get("/trending", controller.getTrending);

module.exports = router;
