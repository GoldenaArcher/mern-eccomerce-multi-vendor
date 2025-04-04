import authMiddleware from "@/middlewares/auth.middleware";
import roleMiddleware from "@/middlewares/role.middleware";

const adminRoleAuthMiddleware = roleMiddleware("admin");

const adminAuthMiddleware = [authMiddleware, roleMiddleware("admin")];
const sellerAuthMiddleware = [authMiddleware, roleMiddleware("seller")];

export { adminRoleAuthMiddleware, adminAuthMiddleware, sellerAuthMiddleware };
