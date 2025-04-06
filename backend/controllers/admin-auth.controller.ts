import { Request } from "express";
import { AuthError, NotFoundError } from "@/errors";
import {
  ControllerResponse,
  ControllerResponseWithRefresh,
} from "@/models/response.model";
import { CatchAndSend } from "@/decorators/catch-and-send.decorator";
import { AdminAuthService } from "@/services/admin-auth.service";
import { UseRefreshCookie } from "@/decorators/use-refresh-cookie.decorator";
import { ExtendedRequest } from "@/types/auth";

class AdminAuthController {
  private adminAuthService: AdminAuthService;

  constructor(adminAuthService: AdminAuthService) {
    this.adminAuthService = adminAuthService;
  }

  @UseRefreshCookie()
  @CatchAndSend()
  async login(
    req: Request
  ): Promise<
    ControllerResponseWithRefresh<{ accessToken: string; user: any }>
  > {
    const { email, password } = req.body;
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

  @CatchAndSend()
  async getUser(req: ExtendedRequest): Promise<ControllerResponse> {
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

  @UseRefreshCookie()
  @CatchAndSend()
  async refreshToken(
    req: Request
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
