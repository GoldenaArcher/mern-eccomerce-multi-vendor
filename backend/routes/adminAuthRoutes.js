const AdminAuthController = require("../controllers/AdminAuthController");
const { adminAuthMiddleware } = require("../middlewares/authAggregrateMiddleware");
const AdminAuthService = require("../services/AdminAuthService");
const adminAuthController = new AdminAuthController(AdminAuthService);

const router = require("express").Router();

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
