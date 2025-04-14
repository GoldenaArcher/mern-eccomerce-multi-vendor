import { NextFunction, Request, Response } from "express-serve-static-core";
import { ShopService } from "@/services/shop.service";
import { ExtendedRequest } from "@/types/auth";
import ResponseModel from "@/models/response.model";
import { NotFoundError } from "@/errors";

class ShopController {
  private shopService: ShopService;

  constructor(shopService: ShopService) {
    this.shopService = shopService;
  }

  async getShopForCurrentSeller(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {
        user: { id: sellerId },
      } = req as ExtendedRequest;

      const shop = await this.shopService.getShopForCurrentSeller(sellerId);
      console.log(shop);

      if (!shop) {
        next(new NotFoundError("Shop not found"));
        return;
      }

      ResponseModel.ok("Shop fetched successfully", shop).send(res);
    } catch (err) {
      console.error("Error in getShopForCurrentSeller:", err);
      next(err);
    }
  }
}

export default ShopController;
