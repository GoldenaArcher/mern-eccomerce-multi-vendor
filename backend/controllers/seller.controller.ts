import { Request, Response, NextFunction } from "express";

import { SellerService } from "@/services/seller.service";
import { ISeller } from "@/models/seller.model";
import { AuthError, BadRequestError } from "@/errors";
import ResponseModel from "@/models/response.model";
import { deleteImagePaths } from "@/utils/upload.util";
import { ExtendedRequest } from "@/types/auth";

class SellerController {
  private sellerService: SellerService;

  constructor(sellerService: SellerService) {
    this.sellerService = sellerService;
  }

  async getAllSellers(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;
      const isAll = req.query.all === "true";
      const filter = search ? { name: { $regex: search, $options: "i" } } : {};

      if (isAll) {
        const sellers = await this.sellerService.getAllSellers({
          filter,
        });
        ResponseModel.ok("Sellers retrieved successfully.", sellers).send(res);
        return;
      }

      const result = await this.sellerService.getAllSellers({
        page,
        limit,
        filter,
      });

      ResponseModel.ok(
        "Sellers retrieved successfully.",
        result.sellers,
        result.pagination
      ).send(res);
    } catch (err) {
      next(err);
    }
  }

  async getSellerById(req: Request, res: Response, next: NextFunction) {
    try {
      const sellerId = req.params.sellerId;
      const includeShop = req.query.shop === "true";

      const seller = await this.sellerService.getSellerById(
        sellerId,
        includeShop
      );
      if (!seller) {
        return next(new AuthError(404, "Seller not found"));
      }
      ResponseModel.ok("Seller retrieved successfully.", seller).send(res);
    } catch (err) {
      next(err);
    }
  }

  async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as ISeller;
      const userId = user.id;
      const seller = await this.sellerService.getSellerById(userId);

      if (!seller) {
        return next(new AuthError(404, "Seller not found"));
      }

      new ResponseModel({
        message: "Seller retrieved successfully",
        data: seller,
      }).send(res);
    } catch (err) {
      next(err);
    }
  }

  async updateUserProfile(req: Request, res: Response, next: NextFunction) {
    const image = req.file;

    try {
      const {
        user: { id: sellerId },
      } = req as ExtendedRequest;

      if (!image) {
        return next(new BadRequestError("Avatar is required."));
      }

      const existingSeller = await this.sellerService.getSellerById(sellerId);

      const updatedSeller = await this.sellerService.updateSellerProfile(
        sellerId,
        image
      );

      if (
        existingSeller!.image &&
        existingSeller!.image !== updatedSeller.image
      ) {
        await deleteImagePaths([existingSeller!.image]);
      }

      ResponseModel.ok(
        "User profile updated successfully.",
        updatedSeller
      ).send(res);
    } catch (err) {
      next(err);
    }
  }

  async updateSellerById(req: Request, res: Response, next: NextFunction) {
    try {
      const sellerId = req.params.sellerId;
      const updatedSellerData = req.body;

      console.log(updatedSellerData);

      const updatedSeller = await this.sellerService.updateSellerById(
        sellerId,
        updatedSellerData
      );

      ResponseModel.ok("Seller updated successfully.", updatedSeller).send(res);
    } catch (err) {
      next(err);
    }
  }
}

export default SellerController;
