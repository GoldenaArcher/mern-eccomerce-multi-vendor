import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../types";

export const decodeJwtToken = (token: string) => {
  try {
    return jwtDecode<CustomJwtPayload>(token);
  } catch {
    return null;
  }
};
