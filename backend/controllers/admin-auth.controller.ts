import { Request, Response, NextFunction } from "express";
import { AuthError, NotFoundError } from "@/errors";
import ResponseModel from "@/models/response.model";

interface AdminAuthService {
  authenticateAdmin(
    email: string,
    password: string
  ): Promise<{
    admin: any;
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  } | null>;

  getAdmin(id: string): Promise<any>;

  refreshAccessToken(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  }>;
}

class AdminAuthController {
  private adminAuthService: AdminAuthService;

  constructor(adminAuthService: AdminAuthService) {
    this.adminAuthService = adminAuthService;
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
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
        sameSite: "lax",
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

  async getUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const {
        user: { id },
      } = req as any; // Ideally, attach user to Request via a custom interface

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

  async refreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const refreshToken = req?.cookies?.refreshToken;

    if (!refreshToken) {
      return next(
        new AuthError(401, "Unauthorized: No refresh token provided.")
      );
    }

    try {
      const newTokens = await this.adminAuthService.refreshAccessToken(
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
}

export default AdminAuthController;
