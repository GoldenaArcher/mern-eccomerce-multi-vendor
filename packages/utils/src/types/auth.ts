export interface CustomJwtPayload {
  sub: string;
  exp: number;
  iat: number;
  role: "admin" | "seller" | "user";
  [key: string]: any;
}
