const returnResponse = require("../utils/responseUtil");

class AdminAuthController {
  constructor(adminAuthService) {
    this.adminAuthService = adminAuthService;
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const { admin, token } = await this.adminAuthService.authenticateAdmin(
        email,
        password
      );

      if (!admin) {
        return next({ statusCode: 401, message: "Invalid admin credentials" });
      }

      const { password: _, ...sanitizedAdmin } = admin.toObject();

      returnResponse(res, {
        message: "Login successful",
        data: {
          token,
          admin: sanitizedAdmin,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AdminAuthController;
