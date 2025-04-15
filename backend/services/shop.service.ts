import Shop from "@/models/shop.model";
import Seller from "@/models/seller.model";
import { sanitizeDocument } from "@/utils/mongoose.util";

class ShopService {
  async getShopForCurrentSeller(sellerId: string) {
    const shop = await Shop.findOne({ seller: sellerId });

    if (!shop) return null;

    return sanitizeDocument(shop);
  }

  async createShopForCurrentSeller(sellerId: string, shopData: any) {
    const existingShop = await Shop.findOne({ seller: sellerId });
    if (existingShop) {
      throw new Error("This seller already has a shop.");
    }

    const shop = await Shop.create({ seller: sellerId, ...shopData });

    await Seller.findByIdAndUpdate(sellerId, { shop: shop._id });

    return sanitizeDocument(shop);
  }
}

export { ShopService };

export default new ShopService();
