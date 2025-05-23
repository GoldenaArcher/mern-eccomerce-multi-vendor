import { parseJwtUserInfo, clearAuthToken } from "@mern/utils";
import { authInitialState } from "../store/features/authSlice";

export const rehydrateJwtToken = () => {
  try {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) return authInitialState;

    const decoded = parseJwtUserInfo(authToken);

    if (!decoded.userInfo.role) {
      throw new Error("Role missing in JWT payload");
    }

    return {
      accessToken: authToken,
      ...decoded,
    };
  } catch (e) {
    console.error(e);
    clearAuthToken();
    return authInitialState;
  }
};
