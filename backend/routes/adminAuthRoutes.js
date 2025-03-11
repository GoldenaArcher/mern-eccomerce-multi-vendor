const AdminAuthController = require("../controllers/AdminAuthController");
const authMiddleware = require("../middlewares/authMiddleware");
const AdminAuthService = require("../services/AdminAuthService");

const router = require("express").Router();
const adminAuthController = new AdminAuthController(AdminAuthService);

router.post(
  "/admin/login",
  adminAuthController.login.bind(adminAuthController)
);
router.get(
  "/admin/user",
  authMiddleware,
  adminAuthController.getUser.bind(adminAuthController)
);

module.exports = router;
