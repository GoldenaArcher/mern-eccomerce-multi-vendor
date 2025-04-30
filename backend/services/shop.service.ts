import ShopModel from "@/models/shop.model";
import SellerModel from "@/models/seller.model";
import ProductModel from "@/models/product.model";
import { sanitizeDocument } from "@/utils/mongoose.util";
import { NotFoundError } from "@/errors";

class ShopService {
  async getShopBySellerId(sellerId: string) {
    const shop = await ShopModel.findOne({ seller: sellerId });

    if (!shop) return null;

    return sanitizeDocument(shop);
  }

  async createShop(sellerId: string, shopData: any) {
    const existingShop = await ShopModel.findOne({ seller: sellerId });
    if (existingShop) {
      throw new Error("This seller already has a shop.");
    }

    const shop = await ShopModel.create({ seller: sellerId, ...shopData });

    await SellerModel.findByIdAndUpdate(sellerId, { shop: shop._id });

    return sanitizeDocument(shop);
  }

  async getCategoriesByShopId(shopId: string) {
    const shop = await ShopModel.findById(shopId);
    if (!shop) {
      throw new NotFoundError("Shop not found");
    }

    const results = await ProductModel.aggregate([
      {
        $match: { seller: shop.seller },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      {
        $unwind: "$categoryInfo",
      },
      {
        $project: {
          _id: 0,
          categoryId: "$categoryInfo._id",
          name: "$categoryInfo.name",
          count: 1,
        },
      },
    ]);

    return results;
  }

  async getPriceRangeByShopId(shopId: string) {
    const shop = await ShopModel.findById(shopId);
    if (!shop) {
      throw new NotFoundError("Shop not found");
    }
    const results = await ProductModel.aggregate([
      {
        $match: { seller: shop.seller },
      },
      {
        $group: {
          _id: null,
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
      {
        $project: {
          _id: 0,
          min: { $floor: "$minPrice" },
          max: { $ceil: "$maxPrice" },
        },
      },
    ]);

    const priceRange = results[0] ?? { min: 0, max: 100 };

    return priceRange;
  }
}

export { ShopService };

export default new ShopService();
