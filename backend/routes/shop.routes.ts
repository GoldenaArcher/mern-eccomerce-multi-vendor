import { Router } from "express";
import ShopController from "@/controllers/shop.controller";
import shopService from "@/services/shop.service";

const shopController = new ShopController(shopService);

const router = Router();

router.get("/", shopController.getAllShops.bind(shopController));

router.get(
  "/:shopId/categories",
  shopController.getShopCategories.bind(shopController)
);

router.get(
  "/:shopId/price-range",
  shopController.getShopPriceRange.bind(shopController)
);

router.get(
  "/:shopId/products",
  shopController.getShopProducts.bind(shopController)
)

export default router;
