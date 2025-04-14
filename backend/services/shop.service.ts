import Shop from "@/models/shop.model";

class ShopService {
  async getShopForCurrentSeller(sellerId: string) {
    const shop = await Shop.findOne({ seller: sellerId });
    return shop;
  }
}

export { ShopService };

export default new ShopService();
