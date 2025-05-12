import ShopModel from "@/models/shop.model";
import SellerModel from "@/models/seller.model";
import ProductModel from "@/models/product.model";
import { sanitizeDocument } from "@/utils/mongoose.util";
import { NotFoundError } from "@/errors";
import { GetAllProductsOptions } from "@/types/product";
import productService from "./product.service";

class ShopService {
  async getAllShops(
    options: {
      page?: number;
      limit?: number;
      filter?: Record<string, any>;
    } = {}
  ) {
    const { page, limit, filter = {} } = options;
    if (!page || !limit) {
      const shops = await ShopModel.find(filter).sort({
        createdAt: -1,
      });
      return { shops: shops.map((shop) => sanitizeDocument(shop)) };
    }

    const totalItems = await ShopModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);
    const shops = await ShopModel.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return {
      shops: shops.map((shop) => sanitizeDocument(shop)),
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
      },
    };
  }

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

    return productService.getPriceRangeByMatcher({ seller: shop.seller });
  }

  async getAllProductsByShopId(options: GetAllProductsOptions & { shopId: string }) {
    const shop = await ShopModel.findById(options.shopId);

    if (!shop || !shop.seller) {
      throw new NotFoundError("Invalid shopId or seller not found");
    }

    return productService.getAllProductsByShopId(options);
  }
}

export { ShopService };

export default new ShopService();
