const Admin = require("../models/Admin");
const TokenService = require("./TokenService");

class AdminAuthService {
  async authenticateAdmin(email, password) {
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin || !(await admin.comparePassword(password))) return null;

    const { accessToken, refreshToken, jti } = admin.generateAuthToken();

    await TokenService.storeRefreshToken(admin.id, jti);

    const sanitizedAdmin = admin.toObject();
    delete sanitizedAdmin.password;

    return { accessToken, refreshToken, admin: sanitizedAdmin, jti };
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
