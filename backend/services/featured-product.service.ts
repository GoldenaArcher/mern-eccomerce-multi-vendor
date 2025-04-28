import FeaturedProductModel from "@/models/featured-product.model";
import { sanitizeDocument } from "@/utils/mongoose.util";

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
}

export default new FeaturedProductService();
