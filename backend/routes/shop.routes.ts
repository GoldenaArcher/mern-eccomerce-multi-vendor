import { Router } from "express";
import ShopController from "@/controllers/shop.controller";
import shopService from "@/services/shop.service";

const shopController = new ShopController(shopService);

const router = Router();

router.get(
  "/:shopId/categories",
  shopController.getShopCategories.bind(shopController)
);

export default router;
