import SellerAuthController from "@/controllers/seller-auth.controller";
import { sellerAuthMiddleware } from "@/middlewares/auth-aggregate.middleware";
import sellerAuthService from "@/services/seller-auth.service";

const sellerAuthController = new SellerAuthController(sellerAuthService);

const router = require("express").Router();

router.post(
  "/register",
  sellerAuthController.register.bind(sellerAuthController)
);
router.post("/login", sellerAuthController.login.bind(sellerAuthController));
router.get(
  "/user",
  sellerAuthMiddleware,
  sellerAuthController.getUser.bind(sellerAuthController)
);
router.post(
  "/refresh-token",
  sellerAuthController.refreshToken.bind(sellerAuthController)
);

export default router;
