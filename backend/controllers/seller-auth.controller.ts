import { Request, Response, NextFunction } from "express";

import { AuthError, BadRequestError } from "@/errors";
import ResponseModel from "@/models/response.model";
import { ISeller } from "@/models/seller.model";
import TokenService from "@/services/token.service";
import { SellerAuthService } from "@/services/seller-auth.service";
import { ExtendedRequest } from "@/types/auth";
import { deleteImagePaths } from "@/utils/upload.util";

class SellerAuthController {
  private sellerAuthService: SellerAuthService;

  constructor(sellerAuthService: SellerAuthService) {
    this.sellerAuthService = sellerAuthService;
  }

  async register(req: Request, res: Response, next: NextFunction) {
    const { email, name, password } = req.body;
    if (!email?.trim() || !name?.trim() || !password?.trim()) {
      return next(
        new AuthError(400, "All fields (email, name, password) are required.")
      );
    }

    try {
      const existingSeller = await this.sellerAuthService.getSellerByEmail(
        email
      );

      if (existingSeller) {
        return next(new AuthError(400, "Seller already exists."));
      }

      const seller = await this.sellerAuthService.createSeller({
        email,
        name,
        password,
        method: "manually",
      });

      const { accessToken, refreshToken, jti, expiresAt } =
        TokenService.generateTokens(
          this.sellerAuthService.getSellerForAuthToken(seller)
        );

      await TokenService.storeRefreshToken(seller._id as string, jti);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: (expiresAt - Math.floor(Date.now() / 1000)) * 1000,
        path: "/",
      });

      new ResponseModel({
        code: 201,
        message: "Registration successful",
        data: {
          accessToken,
          user: seller,
        },
      }).send(res);
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email?.trim() || !password?.trim()) {
      return next(
        new AuthError(400, "All fields (email, password) are required.")
      );
    }
    try {
      const authenticatedSeller =
        await this.sellerAuthService.authenticateSeller(email, password);

      if (!authenticatedSeller) {
        return next(new AuthError(401, "Invalid seller credentials"));
      }

      const { seller, accessToken, refreshToken, expiresAt } =
        authenticatedSeller;

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: (expiresAt - Math.floor(Date.now() / 1000)) * 1000,
        path: "/",
      });
      new ResponseModel({
        message: "Login successful",
        data: {
          accessToken,
          user: seller,
        },
      }).send(res);
    } catch (err) {
      next(err);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as ISeller;
      const userId = user.id;
      const seller = await this.sellerAuthService.getSellerById(userId);

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

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req?.cookies?.refreshToken;

    if (!refreshToken) {
      next(new AuthError(401, "Unauthorized: No refresh token provided."));
    }

    try {
      const newTokens = await this.sellerAuthService.refreshAccessToken(
        refreshToken
      );

      res.cookie("refreshToken", newTokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: newTokens.expiresAt * 1000,
        path: "/",
      });

      new ResponseModel({
        message: "Token refreshed successfully",
        data: { accessToken: newTokens.accessToken },
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

      const existingSeller = await this.sellerAuthService.getSellerById(
        sellerId
      );

      const updatedSeller = await this.sellerAuthService.updateSellerProfile(
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

export default SellerAuthController;
