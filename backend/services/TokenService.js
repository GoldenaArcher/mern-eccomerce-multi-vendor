const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const RefreshToken = require("../models/RefreshToken");
const { daysToMs } = require("../utils/timeUtil");

class TokenService {
  static #generateAccessToken(userDetails) {
    return jwt.sign(userDetails, process.env.JWT_SECRET, { expiresIn: "15m" });
  }

  static #generateRefreshToken(userId, jti) {
    return jwt.sign({ id: userId, jti }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });
  }

  static generateTokens(userDetails) {
    const jti = crypto.randomUUID();
    return {
      accessToken: this.#generateAccessToken(userDetails),
      refreshToken: this.#generateRefreshToken(userDetails.id, jti),
      jti,
    };
  }

  static async storeRefreshToken(userId, jti) {
    await RefreshToken.deleteMany({ userId });
    const newRefreshToken = new RefreshToken({
      userId,
      jti,
      expiresAt: new Date(Date.now() + daysToMs(7)),
    });
    await newRefreshToken.save();
  }
}

module.exports = TokenService;
