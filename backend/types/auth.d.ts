import type { JwtPayload } from "jsonwebtoken";
import type { Request } from "express";

export interface UserWithRole extends JwtPayload {
  id: string;
  role: string;
}

export interface ExtendedRequest extends Request {
  user: UserWithRole;
}
