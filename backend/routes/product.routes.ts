import { Router } from "express";

import ProductController from "@/controllers/product.controller";
import productService from "@/services/product.service";
import { sellerAuthMiddleware } from "@/middlewares/auth-aggregate.middleware";
import upload from "@/middlewares/upload.middleware";

import featuredProductRoutes from "./featured-product.routes";

const productController = new ProductController(productService);

const router = Router();

router.post(
  "/seller/products",
  sellerAuthMiddleware,
  upload.array("images", 5),
  productController.addProduct.bind(productController)
);
router.put(
  "/seller/products/:productId",
  sellerAuthMiddleware,
  upload.array("images", 5),
  productController.updateProduct.bind(productController)
);
router.get(
  "/products",
  productController.getAllProducts.bind(productController)
);
router.use("/products", featuredProductRoutes)
router.get(
  "/products/shop/:shopId",
  productController.getProductsByShopId.bind(productController)
)
router.get(
  "/products/:productId",
  productController.getProductById.bind(productController)
);

export default router;
