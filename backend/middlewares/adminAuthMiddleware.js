const authMiddleware = require("./authMiddleware");
const roleMiddleware = require("./roleMiddleware");

const adminRoleAuthMiddleware = roleMiddleware("admin");

const adminAuthMiddleware = [authMiddleware, roleMiddleware("admin")];

module.exports = { adminAuthMiddleware, adminRoleAuthMiddleware };
