import { decodeJwtToken } from "./decodeJwtToken";

export const parseJwtUserInfo = (token: string) => {
  if (!token) return null;

  const decoded = decodeJwtToken(token);

  if (!decoded) {
    throw new Error("Invalid JWT token");
  }

  return {
    userInfo: decoded,
    isAdmin: decoded.role === "admin",
    isSeller: decoded.role === "seller",
  };
};
