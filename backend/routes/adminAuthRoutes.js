const AdminAuthController = require("../controllers/AdminAuthController");
const AdminAuthService = require("../services/AdminAuthService");

const router = require("express").Router();
const adminAuthController = new AdminAuthController(AdminAuthService);

router.post(
  "/admin/login",
  adminAuthController.login.bind(adminAuthController)
);

module.exports = router;
