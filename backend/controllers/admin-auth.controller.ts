import { NextFunction, Request, RequestHandler, Response } from "express";
import { ExtendedRequest } from "@/types/auth";
import { AuthError, NotFoundError } from "@/errors";
import {
  ControllerResponse,
  ControllerResponseWithRefresh,
} from "@/models/response.model";

import { CatchAndSend } from "@/decorators/catch-and-send.decorator";
import { BindRoute } from "@/decorators/bind-route.decorator";
import { UseRefreshCookie } from "@/decorators/use-refresh-cookie.decorator";

import { AdminAuthService } from "@/services/admin-auth.service";
import { controllerAdapter } from "@/utils/controller-adapter";

class AdminAuthController {
  private adminAuthService: AdminAuthService;
  public routes: Record<string, RequestHandler> = {};

  constructor(adminAuthService: AdminAuthService) {
    this.adminAuthService = adminAuthService;

    this.routes = {
      login: controllerAdapter(this.login.bind(this)) as RequestHandler,
      getUser: controllerAdapter(this.getUser.bind(this)) as RequestHandler,
      refreshToken: controllerAdapter(
        this.refreshToken.bind(this)
      ) as RequestHandler,
    };
  }

  @BindRoute()
  @CatchAndSend()
  @UseRefreshCookie()
  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<
    ControllerResponseWithRefresh<{ accessToken: string; user: any }>
  > {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
      throw new AuthError(400, "All fields (email, password) are required.");
    }

    const authenticatedAdmin = await this.adminAuthService.authenticateAdmin(
      email,
      password
    );

    if (!authenticatedAdmin) {
      throw new AuthError(401, "Invalid admin credentials");
    }

    const { admin, accessToken, refreshToken, expiresAt } = authenticatedAdmin;

    return {
      message: "Login successful",
      data: { accessToken, user: admin },
      refreshToken,
      refreshTokenMaxAge: (expiresAt - Math.floor(Date.now() / 1000)) * 1000,
    };
  }

  @BindRoute()
  @CatchAndSend()
  async getUser(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ): Promise<ControllerResponse> {
    const {
      user: { id },
    } = req;

    const user = await this.adminAuthService.getAdmin(id);

    if (!user) {
      throw new NotFoundError("Admin not found");
    }

    return {
      message: "Admin retrieved successfully",
      data: user,
    };
  }

  @BindRoute()
  @CatchAndSend()
  @UseRefreshCookie()
  async refreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ControllerResponseWithRefresh<{ accessToken: string }>> {
    const refreshToken = req?.cookies?.refreshToken;

    if (!refreshToken) {
      throw new AuthError(401, "Unauthorized: No refresh token provided.");
    }

    const newTokens = await this.adminAuthService.refreshAccessToken(
      refreshToken
    );

    return {
      message: "Token refreshed successfully",
      data: {
        accessToken: newTokens.accessToken,
      },
      refreshToken: newTokens.refreshToken,
      refreshTokenMaxAge: newTokens.expiresAt * 1000,
    };
  }
}

export default AdminAuthController;
