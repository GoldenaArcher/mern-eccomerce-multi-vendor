import { Router } from "express";

import SellerAuthController from "@/controllers/seller-auth.controller";
import { sellerAuthMiddleware } from "@/middlewares/auth-aggregate.middleware";
import sellerAuthService from "@/services/seller-auth.service";
import ShopController from "@/controllers/shop.controller";
import shopService from "@/services/shop.service";
import upload from "@/middlewares/upload.middleware";

const sellerAuthController = new SellerAuthController(sellerAuthService);
const shopController = new ShopController(shopService);

const router = Router();

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
router.patch(
  "/user/avatar",
  sellerAuthMiddleware,
  upload.single("image"),
  sellerAuthController.updateUserProfile.bind(sellerAuthController)
);
router.post(
  "/refresh-token",
  sellerAuthController.refreshToken.bind(sellerAuthController)
);

router.get(
  "/shop",
  sellerAuthMiddleware,
  shopController.getShopForCurrentSeller.bind(shopController)
);

export default router;
