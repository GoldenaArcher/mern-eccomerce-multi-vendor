import { BadRequestError } from "@/errors";
import ResponseModel from "@/models/response.model";
import { FeaturedProductService } from "@/services/featured-product.service";
import { NextFunction, Request, Response } from "express";

class FeaturedProductController {
  private featureProductService: FeaturedProductService;

  constructor(featureProductService: FeaturedProductService) {
    this.featureProductService = featureProductService;
  }

  async addFeaturedProduct(req: Request, res: Response, next: NextFunction) {
    const { productId, featureType, displayOrder } = req.body;

    try {
      const featuredProduct =
        await this.featureProductService.addFeaturedProduct(
          productId,
          featureType,
          displayOrder
        );

      ResponseModel.created(
        "Product created successfully.",
        featuredProduct
      ).send(res);
    } catch (error) {
      next(error);
    }
  }

  async getFeaturedProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        type,
        page = 1,
        limit = 10,
      } = req.query as {
        type?: string;
        page?: string;
        limit?: string;
      };

      let typeArray: string[] | undefined = undefined;
      if (type) {
        typeArray = type.split(",").map((item) => item.trim());
      }

      const result = await this.featureProductService.getFeaturedProducts({
        type: typeArray,
        page: Number(page),
        limit: Number(limit),
      });

      ResponseModel.ok(
        "Featured products fetched successfully.",
        result.products,
        result.pagination
      ).send(res);
    } catch (error) {
      next(error);
    }
  }

  async getPartitionedFeaturedProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { types } = req.query as { types?: string };

      if (!types) {
        return next(new BadRequestError("Missing types parameter"));
      }

      const typeArray = types.split(",").map((type) => type.trim());

      const partitionedProducts =
        await this.featureProductService.getPartitionedFeaturedProducts(
          typeArray
        );

      ResponseModel.ok(
        "Partitioned featured products fetched successfully.",
        partitionedProducts
      ).send(res);
    } catch (error) {
      next(error);
    }
  }
}

export default FeaturedProductController;
