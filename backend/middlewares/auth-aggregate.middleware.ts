import authMiddleware from "@/middlewares/auth.middleware";
import roleMiddleware from "@/middlewares/role.middleware";

const adminAuthMiddleware = [authMiddleware, roleMiddleware("admin")];
const sellerAuthMiddleware = [authMiddleware, roleMiddleware("seller")];

export { adminAuthMiddleware, sellerAuthMiddleware };
