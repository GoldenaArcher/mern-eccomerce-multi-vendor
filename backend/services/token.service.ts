import jwt from "jsonwebtoken";
import crypto from "crypto";
import RefreshToken from "../models/refresh-token.model";
import { daysToSecond } from "../utils/time.util";
import { UserDetails } from "@/types/user";
import { UserWithRole } from "@/types/auth";

class TokenService {
  static #generateAccessToken(userDetails: UserDetails): string {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }

    return jwt.sign(userDetails, process.env.JWT_SECRET, { expiresIn: "15m" });
  }

  static #generateRefreshToken(
    userId: string,
    jti: string,
    issuedAt: number,
    expiresAt: number
  ) {
    if (!process.env.JWT_REFRESH_SECRET) {
      throw new Error(
        "JWT_REFRESH_SECRET is not defined in the environment variables"
      );
    }

    return jwt.sign(
      { id: userId, jti, iat: issuedAt, exp: expiresAt },
      process.env.JWT_REFRESH_SECRET
    );
  }

  static generateTokens(userDetails: UserDetails, exp?: number) {
    const jti = crypto.randomUUID();
    const issuedAt = Math.floor(Date.now() / 1000);
    const expiresAt =
      exp ??
      issuedAt +
        parseInt(
          String(process.env.REFRESH_TOKEN_EXPIRY || daysToSecond(30)),
          10
        );

    return {
      accessToken: this.#generateAccessToken(userDetails),
      refreshToken: this.#generateRefreshToken(
        userDetails.id,
        jti,
        issuedAt,
        expiresAt
      ),
      jti,
      issuedAt,
      expiresAt,
    };
  }

  static async storeRefreshToken(userId: string, jti: string) {
    await RefreshToken.deleteMany({ userId });

    const newRefreshToken = new RefreshToken({
      userId,
      jti,
    });

    await newRefreshToken.save();
  }

  static async getRefreshToken(userId: string, jti: string) {
    return RefreshToken.findOne({ userId, jti });
  }

  static verifyAccessToken(token: string): UserWithRole {
    return jwt.verify(token, process.env.JWT_SECRET!) as UserWithRole;
  }

  static verifyRefreshToken(token: string) {
    if (!process.env.JWT_REFRESH_SECRET) {
      throw new Error(
        "JWT_REFRESH_SECRET is not defined in the environment variables"
      );
    }
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      return null;
    }
  }
}

export default TokenService;
