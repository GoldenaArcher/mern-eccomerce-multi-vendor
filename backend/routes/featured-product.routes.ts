import FeaturedProductController from "@/controllers/featured-product.controller";
import { adminAuthMiddleware } from "@/middlewares/auth-aggregate.middleware";
import featuredProductService from "@/services/featured-product.service";
import { Router } from "express";

const router = Router();

const featuredProductController = new FeaturedProductController(
  featuredProductService
);

router.post(
  "/featured",
  adminAuthMiddleware,
  featuredProductController.addFeaturedProduct.bind(featuredProductController)
);

router.get(
  "/featured",
  featuredProductController.getFeaturedProducts.bind(featuredProductController)
);

router.get(
  "/featured/partitioned",
  featuredProductController.getPartitionedFeaturedProducts.bind(
    featuredProductController
  )
);

export default router;
