import authMiddleware from "@/middlewares/auth.middleware";
import roleMiddleware from "@/middlewares/role.middleware";

const adminAuthMiddleware = [authMiddleware, roleMiddleware("admin")];
const sellerAuthMiddleware = [authMiddleware, roleMiddleware("seller")];
const sellerOrAdminAuthMiddleware = [
  authMiddleware,
  roleMiddleware(["seller", "admin"]),
];

export {
  adminAuthMiddleware,
  sellerAuthMiddleware,
  sellerOrAdminAuthMiddleware,
};
