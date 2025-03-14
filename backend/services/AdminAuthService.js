const { AuthError } = require("../errors");
const Admin = require("../models/Admin");
const RefreshToken = require("../models/RefreshToken");
const TokenService = require("./TokenService");

class AdminAuthService {
  #getSantizedAdmin(admin) {
    const sanitizedAdmin = admin.toObject();
    delete sanitizedAdmin.password;

    return sanitizedAdmin;
  }

  #getAdminForAuthToken(admin) {
    return { id: admin.id, role: admin.role };
  }

  async authenticateAdmin(email, password) {
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin || !(await admin.comparePassword(password))) return null;

    const { accessToken, refreshToken, jti, issuedAt, expiresAt } =
      TokenService.generateTokens(this.#getAdminForAuthToken(admin));

    await TokenService.storeRefreshToken(admin.id, jtit);

    const sanitizedAdmin = this.#getSantizedAdmin(admin);

    return {
      accessToken,
      refreshToken,
      admin: sanitizedAdmin,
      jti,
      expiresAt,
    };
  }

  async refreshAccessToken(refreshToken) {
    const decoded = TokenService.verifyRefreshToken(refreshToken);
    if (!decoded) {
      throw new AuthError(
        401,
        "Unauthorized: Refresh token is invalid or expired."
      );
    }

    const { id, jti, exp } = decoded;

    if (exp < Math.floor(Date.now() / 1000)) {
      await RefreshToken.deleteMany({ userId: id });
      throw new AuthError(401, "Session expired. Please log in again.");
    }

    const [admin, storedToken] = await Promise.all([
      this.getAdmin(id),
      TokenService.getRefreshToken(id, jti),
    ]);

    if (!storedToken) {
      throw new AuthError(401, "Unauthorized: Refresh token not found.");
    }

    if (!admin || admin.role !== "admin") {
      throw new AuthError(403, "Forbidden: Only admins can refresh tokens.");
    }

    const newTokens = TokenService.generateTokens(
      this.#getAdminForAuthToken(this.#getSantizedAdmin(admin)),
      exp
    );

    await TokenService.storeRefreshToken(id, newTokens.jti);

    return newTokens;
  }

  async createAdmin(adminData) {
    const admin = await Admin.create(adminData);
    return admin;
  }

  async getAdmin(id) {
    return await Admin.findById(id);
  }
}

module.exports = new AdminAuthService();
