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

  async getSellers(req: Request, res: Response, next: NextFunction) {}

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
}

export default SellerController;
