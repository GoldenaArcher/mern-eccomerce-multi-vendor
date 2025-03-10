const AuthController = require("../controllers/AuthController");

const router = require("express").Router();
const authController = new AuthController();

router.post("/login", authController.login.bind(authController));

module.exports = router;
