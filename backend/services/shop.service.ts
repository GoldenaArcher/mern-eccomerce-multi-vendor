import ShopModel from "@/models/shop.model";
import SellerModel from "@/models/seller.model";
import ProductModel from "@/models/product.model";
import { sanitizeDocument } from "@/utils/mongoose.util";
import { NotFoundError } from "@/errors";
import { GetAllProductsOptions } from "@/types/product";

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

  async getAllProductsByShopId(options: GetAllProductsOptions & { shopId: string }) {
    const {
      page,
      limit,
      search,
      categories = [],
      priceLow,
      priceHigh,
      sortBy,
      shopId,
    } = options;

    const shop = await ShopModel.findById(shopId);

    if (!shop || !shop.seller) {
      throw new NotFoundError("Invalid shopId or seller not found");
    }

    const sellerId = shop.seller;

    const filter: Record<string, any> = {
      seller: sellerId,
    };

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (categories.length > 0) {
      filter.category = { $in: categories };
    }

    if (priceLow || priceHigh) {
      filter.price = {};
      if (priceLow) {
        filter.price.$gte = priceLow;
      }
      if (priceHigh) {
        filter.price.$lte = priceHigh;
      }
    }

    let sort: Record<string, any> = {};

    switch (sortBy) {
      case "price-asc":
        sort = { price: 1 };
        break;
      case "price-desc":
        sort = { price: -1 };
        break;
      case "created-asc":
        sort = { createdAt: 1 };
        break;
      case "created-desc":
      default:
        sort = { createdAt: -1 };
        break;
    }

    if (!page || !limit) {
      const products = await ProductModel.find(filter).sort(sort);
      return { products: products.map((product) => sanitizeDocument(product)) };
    }

    const totalItems = await ProductModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);
    const products = await ProductModel.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort);

    return {
      products: products.map((product) => sanitizeDocument(product)),
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
      },
    };
  }
}

export { ShopService };

export default new ShopService();
