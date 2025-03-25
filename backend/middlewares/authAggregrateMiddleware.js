const authMiddleware = require("./authMiddleware");
const roleMiddleware = require("./roleMiddleware");

const adminRoleAuthMiddleware = roleMiddleware("admin");

const adminAuthMiddleware = [authMiddleware, roleMiddleware("admin")];
const sellerAuthMiddleware = [authMiddleware, roleMiddleware("seller")];

module.exports = {
  adminRoleAuthMiddleware,
  adminAuthMiddleware,
  sellerAuthMiddleware,
};
