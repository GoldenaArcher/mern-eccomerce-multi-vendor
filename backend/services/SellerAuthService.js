const Seller = require("../models/Seller");
const RefreshToken = require("../models/RefreshToken");
const TokenService = require("./TokenService");
const SellerCustomer = require("../models/chat/SellerCustomer");
const { InternalServerError } = require("../errors");

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

  async getSellerById(id) {
    return await Seller.findById(id);
  }

  async getSellerByEmail(email) {
    return await Seller.findOne({ email });
  }
}

module.exports = new SellerAuthService();
