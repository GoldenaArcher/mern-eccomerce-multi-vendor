import { JwtPayload } from "jsonwebtoken";

import { IAdmin } from "@/models/admin.model";
import { AuthError, RefreshTokenAuthError } from "@/errors";
import Admin from "@/models/admin.model";
import TokenService from "./token.service";
import RefreshToken from "../models/refresh-token.model";

export class AdminAuthService {
  #getSantizedAdmin(admin: IAdmin) {
    const sanitizedAdmin = admin.toObject();
    delete sanitizedAdmin.password;

    return sanitizedAdmin;
  }

  getAdminForAuthToken(admin: IAdmin) {
    return { id: admin.id, role: admin.role };
  }

  async authenticateAdmin(email: string, password: string) {
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin || !(await admin.comparePassword(password))) return null;

    const { accessToken, refreshToken, jti, expiresAt } =
      TokenService.generateTokens(this.getAdminForAuthToken(admin));

    await TokenService.storeRefreshToken(admin._id as string, jti);

    const sanitizedAdmin = this.#getSantizedAdmin(admin);

    return {
      accessToken,
      refreshToken,
      admin: sanitizedAdmin,
      jti,
      expiresAt,
    };
  }

  async refreshAccessToken(refreshToken: string) {
    const decoded = TokenService.verifyRefreshToken(refreshToken);
    if (!decoded) {
      throw new RefreshTokenAuthError(
        "Unauthorized: Refresh token is invalid or expired."
      );
    }

    const { id, jti, exp } = decoded as JwtPayload;

    if (!id || !exp || !jti) {
      throw new RefreshTokenAuthError("Invalid token payload.");
    }

    if (exp < Math.floor(Date.now() / 1000)) {
      await RefreshToken.deleteMany({ userId: id });
      throw new RefreshTokenAuthError("Session expired. Please log in again.");
    }

    const [admin, storedToken] = await Promise.all([
      this.getAdmin(id),
      TokenService.getRefreshToken(id, jti),
    ]);

    if (!storedToken) {
      throw new RefreshTokenAuthError("Unauthorized: Refresh token not found.");
    }

    if (!admin || admin.role !== "admin") {
      throw new AuthError(403, "Forbidden: Only admins can refresh tokens.");
    }

    const newTokens = TokenService.generateTokens(
      this.getAdminForAuthToken(admin),
      exp
    );

    await TokenService.storeRefreshToken(id, newTokens.jti);

    return newTokens;
  }

  async createAdmin(adminData: Partial<IAdmin>) {
    const admin = await Admin.create(adminData);
    return admin;
  }

  async getAdmin(id: string) {
    return await Admin.findById(id);
  }
}

export default new AdminAuthService();
