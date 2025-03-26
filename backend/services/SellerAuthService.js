const Seller = require("../models/Seller");
const RefreshToken = require("../models/RefreshToken");
const TokenService = require("./TokenService");
const SellerCustomer = require("../models/chat/SellerCustomer");
const { InternalServerError, AuthError } = require("../errors");

class SellerAuthService {
  #getSantizedSeller(seller) {
    const sanitizedSeller = seller.toObject();
    delete sanitizedSeller.password;

    return sanitizedSeller;
  }

  getSellerForAuthToken(seller) {
    return { id: seller.id, role: seller.role };
  }

  async #saveSeller(seller) {
    const savedSeller = await seller.save();
    return this.#getSantizedSeller(savedSeller);
  }

  async authenticateSeller(email, password) {
    const seller = await Seller.findOne({ email }).select("+password");

    if (!seller || !(await seller.comparePassword(password))) return null;

    const { accessToken, refreshToken, jti, expiresAt } =
      TokenService.generateTokens(this.getSellerForAuthToken(seller));

    await TokenService.storeRefreshToken(seller.id, jti);

    const sanitizedSeller = this.#getSantizedSeller(seller);

    return {
      accessToken,
      refreshToken,
      seller: sanitizedSeller,
      jti,
      expiresAt,
    };
  }

  async #initializeSellerCustomer(sellerId) {
    await SellerCustomer.create({
      sellerId,
    });
  }

  async createSeller(data) {
    const seller = new Seller(data);

    const newSeller = await this.#saveSeller(seller);

    try {
      await this.#initializeSellerCustomer(newSeller._id);
      return newSeller;
    } catch (err) {
      console.error("Failed to initialize SellerCustomer:", err);

      await Seller.findByIdAndDelete(newSeller.id);

      throw new InternalServerError(
        "Registration failed: Unable to initialize seller data."
      );
    }
  }

  async refreshAccessToken(refreshToken) {
    const decoded = TokenService.verifyRefreshToken(refreshToken);
    if (!decoded) {
      throw new AuthError(
        401,
        "Unauthorized: Refresh token is invalid or expired."
      );
    }

    const { jti, id, exp } = decoded;

    if (exp < Math.floor(Date.now() / 1000)) {
      await RefreshToken.deleteMany({ userId: id });
      throw new AuthError(401, "Session expired. Please log in again.");
    }

    const [seller, storedToken] = await Promise.all([
      Seller.findById(id),
      TokenService.getRefreshToken(id, jti),
    ]);

    if (!storedToken) {
      throw new AuthError(401, "Unauthorized: Refresh token not found.");
    }

    if (!seller || !seller.role === "seller") {
      throw new AuthError(401, "Unauthorized: Seller not found.");
    }

    const newTokens = TokenService.generateTokens(
      this.getSellerForAuthToken(seller),
      exp
    );

    await TokenService.storeRefreshToken(id, newTokens.jti);

    return newTokens;
  }

  async getSellerById(id) {
    return await Seller.findById(id);
  }

  async getSellerByEmail(email) {
    return await Seller.findOne({ email });
  }
}

module.exports = new SellerAuthService();
