import { Router } from "express";

import AdminAuthController from "@/controllers/admin-auth.controller";
import { adminAuthMiddleware } from "@/middlewares/auth-aggregate.middleware";
import AdminAuthService from "@/services/admin-auth.service";

const adminAuthController = new AdminAuthController(AdminAuthService);

const router = Router();

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

export default router;
