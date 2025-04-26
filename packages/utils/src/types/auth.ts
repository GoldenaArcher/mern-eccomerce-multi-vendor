export interface CustomJwtPayload {
  sub: string;
  exp: number;
  iat: number;
  role: "admin" | "seller" | "user";
  [key: string]: any;
}

export interface GetUserInfoPayload {
  data: CustomJwtPayload;
}

export interface AuthState {
  accessToken: string | null;
  userInfo: CustomJwtPayload | null;
  isAdmin: boolean;
  isSeller: boolean;
}

export interface LoginSuccessPayload {
  data: {
    message: string | null;
    accessToken: string;
    user: CustomJwtPayload;
  };
}
