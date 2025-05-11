import slugify from "slugify";
import ProductModel from "@/models/product.model";
import { sanitizeDocument } from "@/utils/mongoose.util";
import { UploadedFileWithPath } from "@/types/upload";
import { BadRequestError, NotFoundError } from "@/errors";
import { GetAllProductsOptions } from "@/types/product";
import shopModel from "@/models/shop.model";

export class ProductService {
  async createProduct({
    name,
    description,
    discount,
    price,
    stock,
    category,
    brand,
    images,
    sellerId,
  }: {
    name: string;
    description: string;
    discount: number;
    price: number;
    stock: number;
    category: string;
    brand: string;
    images: UploadedFileWithPath[];
    sellerId: string;
  }) {
    const slug = slugify(name, { lower: true });

    const imagePaths = images.map((image) => image.publicPath);

    const product = await ProductModel.create({
      name,
      description,
      brand,
      price,
      discount,
      stock,
      images: imagePaths,
      slug,
      category,
      seller: sellerId,
    });

    return sanitizeDocument(product);
  }

  async getAllProducts(options: GetAllProductsOptions = {}) {
    const {
      page,
      limit,
      search,
      categories = [],
      priceLow,
      priceHigh,
      sortBy,
    } = options;

    const filter: Record<string, any> = {};

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

  async getProductsByShopId(
    options: GetAllProductsOptions & { shopId: string }
  ) {
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

    const shop = await shopModel.findById(shopId);

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

  async getProductById(productId: string) {
    const product = await ProductModel.findById(productId);

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    return sanitizeDocument(product);
  }

  async getProductByIdAndSellerId(productId: string, sellerId: string) {
    const product = await ProductModel.findOne({
      _id: productId,
      seller: sellerId,
    });
    if (!product) {
      throw new NotFoundError("Product not found");
    }
    return sanitizeDocument(product);
  }

  async updateProduct(productId: string, updateData: Record<string, any>) {
    // validated by verifyOwnershipOrThrow in controller, no need to check again
    const product = await ProductModel.findById(productId);

    Object.assign(product!, updateData);

    await product!.save();
    return sanitizeDocument(product!);
  }

  async verifyOwnershipOrThrow(productId: string, sellerId: string) {
    const product = await this.getProductByIdAndSellerId(productId, sellerId);
    if (!product) throw new BadRequestError("Product not found.");
    return product;
  }
}

export default new ProductService();
