const { AuthError, NotFoundError } = require("../errors");
const ResponseModel = require("../models/ResponseModel");

class AdminAuthController {
  constructor(adminAuthService) {
    this.adminAuthService = adminAuthService;
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const authenticatedAdmin = await this.adminAuthService.authenticateAdmin(
        email,
        password
      );

      if (!authenticatedAdmin) {
        return next(new AuthError(401, "Invalid admin credentials"));
      }

      const { admin, accessToken, refreshToken, expiresAt } =
        authenticatedAdmin;

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: (expiresAt - Math.floor(Date.now() / 1000)) * 1000,
        path: "/",
      });

      new ResponseModel({
        message: "Login successful",
        data: { accessToken, user: admin },
      }).send(res);
    } catch (err) {
      next(err);
    }
  }

  async getUser(req, res, next) {
    try {
      const {
        user: { id },
      } = req;
      const user = await this.adminAuthService.getAdmin(id);

      if (!user) {
        return next(new NotFoundError("Admin not found"));
      }

      new ResponseModel({
        message: "Admin retrieved successfully",
        data: user,
      }).send(res);
    } catch (err) {
      next(err);
    }
  }

  async refreshToken(req, res, next) {
    const refreshToken = req?.cookies?.refreshToken;

    if (!refreshToken) {
      next(new AuthError(401, "Unauthorized: No refresh token provided."));
    }

    try {
      const newTokens = await this.adminAuthService.refreshAccessToken(
        refreshToken
      );

      res.cookie("refreshToken", newTokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
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
}

module.exports = AdminAuthController;
