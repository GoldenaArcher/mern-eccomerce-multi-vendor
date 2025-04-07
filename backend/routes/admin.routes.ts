import { Router } from "express";

import AdminAuthController from "@/controllers/admin-auth.controller";
import { adminAuthMiddleware } from "@/middlewares/auth-aggregate.middleware";
import AdminAuthService from "@/services/admin-auth.service";

const adminAuthController = new AdminAuthController(AdminAuthService);

const router = Router();

router.post("/login", adminAuthController.routes.login);
router.get("/user", adminAuthMiddleware, adminAuthController.routes.getUser);
router.post("/refresh-token", adminAuthController.routes.refreshToken);

export default router;
