import { Router } from "express";

import AdminAuthController from "@/controllers/admin-auth.controller";
import { adminAuthMiddleware } from "@/middlewares/auth-aggregate.middleware";
import AdminAuthService from "@/services/admin-auth.service";
import SellerController from "@/controllers/seller.controller";
import sellerService from "@/services/seller.service";

const adminAuthController = new AdminAuthController(AdminAuthService);
const sellerController = new SellerController(sellerService);

const router = Router();

router.post("/login", adminAuthController.routes.login);
router.get("/me", adminAuthMiddleware, adminAuthController.routes.getUser);
router.post("/refresh-token", adminAuthController.routes.refreshToken);

router.get(
  "/sellers",
  adminAuthMiddleware,
  sellerController.getAllSellers.bind(sellerController)
);
router.patch(
  "/sellers/:sellerId/status",
  adminAuthMiddleware,
  sellerController.updateSellerById.bind(sellerController)
)

export default router;
