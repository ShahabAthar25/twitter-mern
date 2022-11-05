const router = require("express").Router();

const controller = require("../controllers/Auth.controller");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.delete("/logout", controller.logout);
router.post("/refresh", controller.refresh);
router.post("/forgot", controller.forgotPwd);

module.exports = router;
