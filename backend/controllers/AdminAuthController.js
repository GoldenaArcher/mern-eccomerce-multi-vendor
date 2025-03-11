const { AuthError, NotFoundError } = require("../errors");
const ResponseModel = require("../models/ResponseModel");
const returnResponse = require("../utils/responseUtil");

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

      const { admin, token } = authenticatedAdmin;

      const { password: _, ...sanitizedUser } = admin.toObject();

      new ResponseModel({
        message: "Login successful",
        data: { token, user: sanitizedUser },
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
}

module.exports = AdminAuthController;
