const Admin = require("../models/Admin");

class AdminAuthService {
  async authenticateAdmin(email, password) {
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin || !(await admin.comparePassword(password))) return null;

    return { token: admin.generateAuthToken(), admin };
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
