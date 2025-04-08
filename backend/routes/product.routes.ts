import { Router } from "express";

import ProductController from "@/controllers/product.controller";
import productService from "@/services/product.service";
import { sellerAuthMiddleware } from "@/middlewares/auth-aggregate.middleware";
import upload from "@/middlewares/upload.middleware";
import authMiddleware from "@/middlewares/auth.middleware";

const productController = new ProductController(productService);

const router = Router();

router.post(
  "/seller/products",
  sellerAuthMiddleware,
  upload.array("images", 5),
  productController.addProduct.bind(productController)
);
router.get(
  "/products",
  authMiddleware,
  productController.getAllProducts.bind(productController)
)

export default router;
