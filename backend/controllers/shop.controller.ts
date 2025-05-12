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

  async getAllShops(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = (req.query.search as string) || "";
      const isAll = req.query.all === "true";
      const filter = search ? { name: { $regex: search, $options: "i" } } : {};

      if (isAll) {
        const results = await this.shopService.getAllShops();
        ResponseModel.ok("Shops fetched successfully.", results.shops).send(
          res
        );
        return;
      }

      const result = await this.shopService.getAllShops({
        page,
        limit,
        filter,
      });

      ResponseModel.ok(
        "Shops fetched successfully.",
        result.shops,
        result.pagination
      ).send(res);
    } catch (err) {
      next(err);
    }
  }

  async getShopBySellerId(req: Request, res: Response, next: NextFunction) {
    try {
      const shopId = req.params.shopId;
      const shop = await this.shopService.getShopBySellerId(shopId);
      if (!shop) {
        next(new NotFoundError("Shop not found"));
        return;
      }
      ResponseModel.ok("Shop fetched successfully", shop).send(res);
    } catch (err) {
      next(err);
    }
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

      const shop = await this.shopService.getShopBySellerId(sellerId);

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

  async createShopForCurrentSeller(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {
        user: { id: sellerId },
      } = req as ExtendedRequest;
      const shop = await this.shopService.createShop(sellerId, req.body);
      ResponseModel.created("Shop created successfully", shop).send(res);
    } catch (err) {
      next(err);
    }
  }

  async getShopCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const { shopId } = req.params;

      const categories = await this.shopService.getCategoriesByShopId(shopId);

      ResponseModel.ok(
        "Shop categories fetched successfully.",
        categories
      ).send(res);
    } catch (error) {
      next(error);
    }
  }

  async getShopPriceRange(req: Request, res: Response, next: NextFunction) {
    try {
      const { shopId } = req.params;
      const priceRange = await this.shopService.getPriceRangeByShopId(shopId);
      ResponseModel.ok(
        "Shop price range fetched successfully.",
        priceRange
      ).send(res);
    } catch (error) {
      next(error);
    }
  }

  async getShopProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { shopId } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 12;
      const search = (req.query.search as string) || "";
      const categories = (req.query.categories as string)
        ? (req.query.categories as string).split(",")
        : [];
      const priceLow = req.query.priceLow
        ? parseInt(req.query.priceLow as string)
        : undefined;
      const priceHigh = req.query.priceHigh
        ? parseInt(req.query.priceHigh as string)
        : undefined;
      const sortBy = (req.query.sortBy as string) ?? undefined;

      const isAll = req.query.all === "true";

      if (isAll) {
        const results = await this.shopService.getAllProductsByShopId({
          shopId,
        });
        ResponseModel.ok(
          "Products fetched successfully.",
          results.products
        ).send(res);
        return;
      }
      const result = await this.shopService.getAllProductsByShopId({
        shopId,
        page,
        limit,
        search,
        categories,
        priceLow,
        priceHigh,
        sortBy,
      });

      ResponseModel.ok(
        "Products fetched successfully.",
        result.products,
        result.pagination
      ).send(res);
    } catch (error) {
      next(error);
    }
  }
}

export default ShopController;
