import Seller, { ISeller } from "@/models/seller.model";
import RefreshToken from "@/models/refresh-token.model";
import TokenService from "./token.service";
import SellerCustomer from "@/models/seller-customer-rel";
import {
  InternalServerError,
  AuthError,
  RefreshTokenAuthError,
} from "@/errors";
import { JwtPayload } from "jsonwebtoken";
import sellerService from "./seller.service";

type SanitizedSeller = Omit<ISeller, "password">;

class SellerAuthService {
  getSellerForAuthToken(seller: ISeller | SanitizedSeller) {
    return { id: seller.id, role: seller.role, status: seller.status };
  }

  async authenticateSeller(email: string, password: string) {
    const seller = await Seller.findOne({ email }).select("+password");

    if (!seller || !(await seller.comparePassword(password))) return null;

    const { accessToken, refreshToken, jti, expiresAt } =
      TokenService.generateTokens(this.getSellerForAuthToken(seller));

    await TokenService.storeRefreshToken(seller.id, jti);

    const sanitizedSeller = sellerService.getSantizedSeller(seller);

    return {
      accessToken,
      refreshToken,
      seller: sanitizedSeller,
      jti,
      expiresAt,
    };
  }

  async #initializeSellerCustomer(sellerId: string) {
    await SellerCustomer.create({
      sellerId,
    });
  }

  async createSeller(data: Partial<ISeller>) {
    const seller = new Seller(data);

    const newSeller = await sellerService.saveSeller(seller);

    try {
      await this.#initializeSellerCustomer(newSeller._id as string);
      return newSeller;
    } catch (err) {
      console.error("Failed to initialize SellerCustomer:", err);

      await Seller.findByIdAndDelete(newSeller.id);

      throw new InternalServerError(
        "Registration failed: Unable to initialize seller data."
      );
    }
  }

  async refreshAccessToken(refreshToken: string) {
    const decoded = TokenService.verifyRefreshToken(refreshToken);
    if (!decoded) {
      throw new RefreshTokenAuthError(
        "Unauthorized: Refresh token is invalid or expired."
      );
    }

    const { jti, id, exp } = decoded as JwtPayload;

    if (!id || !exp || !jti) {
      throw new RefreshTokenAuthError("Invalid token payload.");
    }

    if (exp < Math.floor(Date.now() / 1000)) {
      await RefreshToken.deleteMany({ userId: id });
      throw new RefreshTokenAuthError("Session expired. Please log in again.");
    }

    const [seller, storedToken] = await Promise.all([
      Seller.findById(id),
      TokenService.getRefreshToken(id, jti),
    ]);

    if (!storedToken) {
      throw new RefreshTokenAuthError("Unauthorized: Refresh token not found.");
    }

    if (!seller || seller.role !== "seller") {
      throw new AuthError(401, "Unauthorized: Seller not found.");
    }

    const newTokens = TokenService.generateTokens(
      this.getSellerForAuthToken(seller),
      exp
    );

    await TokenService.storeRefreshToken(id, newTokens.jti);

    return newTokens;
  }
}

export { SellerAuthService };

export default new SellerAuthService();
