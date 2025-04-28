import FeaturedProductModel from "@/models/featured-product.model";
import { sanitizeDocument } from "@/utils/mongoose.util";

const sortMap: Record<string, any> = {
  latest: { createdAt: -1 },
  topRated: { ratings: -1 },
  discount: { discount: -1 },
  promotion: { displayOrder: 1 },
};

export class FeaturedProductService {
  async addFeaturedProduct(
    productId: string,
    featureType: string[],
    displayOrder: number
  ) {
    const featuredProduct = await FeaturedProductModel.create({
      productId,
      featureType,
      displayOrder,
    });

    return sanitizeDocument(featuredProduct);
  }

  async getFeaturedProducts({
    type,
    page = 1,
    limit = 10,
  }: {
    type?: string[];
    page: number;
    limit: number;
  }) {
    const filter: any = {};
    if (type) {
      filter.featureType = { $in: [type] };
    }

    const totalItems = await FeaturedProductModel.countDocuments(filter);

    const featureProducts = await FeaturedProductModel.find(filter)
      .sort({ displayOrder: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("productId", "name price images slug");

    const result = featureProducts.map((item) => {
      const product = item.productId as any;
      return {
        id: item._id,
        productId: product._id,
        featureType: item.featureType,
        displayOrder: item.displayOrder,
        product: {
          name: product.name,
          price: product.price,
          thumbnailUrl: product.images?.[0] || "",
          slug: product.slug,
        },
      };
    });

    return {
      products: result,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
      },
    };
  }

  async getPartitionedFeaturedProducts(types: string[]) {
    const partitionedResult: Record<string, any[]> = {};

    for (const type of types) {
      const sort = sortMap[type] || { createdAt: -1 };

      const featuredProducts = await FeaturedProductModel.find({
        featureType: { $in: [type] },
      })
        .sort(sort)
        .limit(12)
        .populate("productId", "name price images slug");

      partitionedResult[type] = featuredProducts.map((item) => {
        const product = item.productId as any;
        return {
          id: item._id,
          productId: product._id,
          featureType: item.featureType,
          displayOrder: item.displayOrder,
          product: {
            name: product.name,
            price: product.price,
            thumbnailUrl: product.images?.[0] || "",
            slug: product.slug,
          },
        };
      });
    }

    return partitionedResult;
  }
}

export default new FeaturedProductService();
