const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const RefreshToken = require("../models/RefreshToken");
const { daysToSecond } = require("../utils/timeUtil");

class TokenService {
  static #generateAccessToken(userDetails) {
    return jwt.sign(userDetails, process.env.JWT_SECRET, { expiresIn: "15m" });
  }

  static #generateRefreshToken(userId, jti, issuedAt, expiresAt) {
    return jwt.sign(
      { id: userId, jti, iat: issuedAt, exp: expiresAt },
      process.env.JWT_REFRESH_SECRET
    );
  }

  static generateTokens(userDetails, exp) {
    const jti = crypto.randomUUID();
    const issuedAt = Math.floor(Date.now() / 1000);
    const expiresAt =
      exp ??
      issuedAt +
        parseInt(process.env.REFRESH_TOKEN_EXPIRY || daysToSecond(30), 10);

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

  static async storeRefreshToken(userId, jti) {
    await RefreshToken.deleteMany({ userId });

    const newRefreshToken = new RefreshToken({
      userId,
      jti,
    });

    await newRefreshToken.save();
  }

  static async getRefreshToken(userId, jti) {
    return RefreshToken.findOne({ userId, jti });
  }

  static verifyAccessToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }

  static verifyRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      return null;
    }
  }
}

module.exports = TokenService;
