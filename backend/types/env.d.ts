import { JwtPayload } from "jsonwebtoken";
import { UserWithRole } from "./auth";

// types/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    NODE_ENV: "development" | "production" | "test";
    JWT_SECRET: string;
    JWT_REFRESH_SECRET: string;
    PORT?: string;
    REFRESH_TOKEN_EXPIRY?: string;
    DATABASE_URL: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: UserWithRole
    }
  }
}
