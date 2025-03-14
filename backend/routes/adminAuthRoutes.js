const AdminAuthController = require("../controllers/AdminAuthController");
const { adminAuthMiddleware } = require("../middlewares/adminAuthMiddleware");
const AdminAuthService = require("../services/AdminAuthService");

const router = require("express").Router();
const adminAuthController = new AdminAuthController(AdminAuthService);

router.post("/login", adminAuthController.login.bind(adminAuthController));
router.get(
  "/user",
  adminAuthMiddleware,
  adminAuthController.getUser.bind(adminAuthController)
);
router.post(
  "/refresh-token",
  adminAuthController.refreshToken.bind(adminAuthController)
);

module.exports = router;
