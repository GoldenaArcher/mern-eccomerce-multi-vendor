import { jwtDecode } from "jwt-decode";
import { authInitialState } from "../store/features/authSlice";

export const decodeJwtToken = (token) => {
  const decodedToken = jwtDecode(token);
  const exp = new Date(decodedToken.exp * 1000);
  if (new Date() > exp) {
    return null;
  }

  return decodedToken;
};

export const rehydrateJwtToken = () => {
  try {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) return authInitialState;

    const decoded = decodeJwtToken(authToken);

    if (!decoded || !decoded.exp) {
      console.warn("Invalid JWT detected. Removing token.");
      localStorage.removeItem("authToken");
      return authInitialState;
    }

    if (decoded) {
      return {
        token: authToken,
        userInfo: decoded,
        isAdmin: decoded.role === "admin",
      };
    }
  } catch (e) {
    console.error(e);
    localStorage.removeItem("authToken");
    return authInitialState;
  }
};
