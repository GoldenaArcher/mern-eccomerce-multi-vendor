import { jwtDecode } from "jwt-decode";
import { authInitialState } from "../store/features/authSlice";
import { clearAuthToken } from "./authHandler";

export const decodeJwtToken = (token) => {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

export const rehydrateJwtToken = () => {
  try {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) return authInitialState;

    const decoded = decodeJwtToken(authToken);

    if (!decoded) {
      console.warn("Invalid JWT detected. Removing token.");
      clearAuthToken();
      return authInitialState;
    }

    return {
      accessToken: authToken,
      userInfo: decoded,
      isAdmin: decoded.role === "admin",
      isSeller: decoded.role === "seller",
    };
  } catch (e) {
    console.error(e);
    clearAuthToken();
    return authInitialState;
  }
};
