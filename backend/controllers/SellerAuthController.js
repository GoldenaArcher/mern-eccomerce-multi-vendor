const { AuthError } = require("../errors");
const ResponseModel = require("../models/ResponseModel");
const TokenService = require("../services/TokenService");

class SellerAuthController {
  constructor(sellerAuthService) {
    this.sellerAuthService = sellerAuthService;
  }

  async register(req, res, next) {
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

      await TokenService.storeRefreshToken(seller._id, jti);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
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

  async login(req, res, next) {
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
        sameSite: "Strict",
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
}

module.exports = SellerAuthController;
