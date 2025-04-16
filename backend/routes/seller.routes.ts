import { Router } from "express";

import SellerAuthController from "@/controllers/seller-auth.controller";
import { sellerAuthMiddleware } from "@/middlewares/auth-aggregate.middleware";
import sellerAuthService from "@/services/seller-auth.service";
import ShopController from "@/controllers/shop.controller";
import shopService from "@/services/shop.service";
import upload from "@/middlewares/upload.middleware";
import SellerController from "@/controllers/seller.controller";
import sellerService from "@/services/seller.service";

const sellerAuthController = new SellerAuthController(
  sellerAuthService,
  sellerService
);
const sellerController = new SellerController(sellerService);
const shopController = new ShopController(shopService);

const router = Router();

router.post(
  "/register",
  sellerAuthController.register.bind(sellerAuthController)
);
router.post("/login", sellerAuthController.login.bind(sellerAuthController));
router.get(
  "/me",
  sellerAuthMiddleware,
  sellerController.getCurrentUser.bind(sellerAuthController)
);
router.patch(
  "/user/avatar",
  sellerAuthMiddleware,
  upload.single("image"),
  sellerController.updateUserProfile.bind(sellerAuthController)
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
router.post(
  "/shop",
  sellerAuthMiddleware,
  shopController.createShopForCurrentSeller.bind(shopController)
);

export default router;
