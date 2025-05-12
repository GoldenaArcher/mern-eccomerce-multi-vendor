import slugify from "slugify";
import CategoryModel from "@/models/category.model";
import { sanitizeDocument } from "@/utils/mongoose.util";
import { UploadedFileWithPath } from "@/types/upload";
import { NotFoundError } from "@/errors";

export class CategoryService {
  async createCategory(name: string, image: Express.Multer.File) {
    const slug = slugify(name, { lower: true });
    const imagePath = `${(image as UploadedFileWithPath).publicPath}`;

    const category = await CategoryModel.create({
      name,
      slug,
      image: imagePath,
    });

    return sanitizeDocument(category);
  }

  async getAllCategories(
    options: {
      page?: number;
      limit?: number;
      filter?: Record<string, any>;
    } = {}
  ) {
    const { page, limit, filter = {} } = options;

    if (!page || !limit) {
      const categories = await CategoryModel.find(filter).sort({
        createdAt: -1,
      });
      return { categories: categories.map((cat) => sanitizeDocument(cat)) };
    }

    const totalCategories = await CategoryModel.countDocuments(filter);

    const categories = await CategoryModel.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return {
      categories: categories.map((cat) => sanitizeDocument(cat)),
      pagination: {
        totalItems: totalCategories,
        currentPage: page,
        perPage: limit,
        totalPages: Math.ceil(totalCategories / limit),
      },
    };
  }

  async getPriceRangeByCategoryId(categoryId: string) {
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      throw new NotFoundError("Category not found");
    }
    
    const priceRange = await CategoryModel.aggregate([
      { $match: { _id: category._id } },
      { $unwind: "$products" },
      {
        $group: {
          _id: null,
          min: { $min: "$products.price" },
          max: { $max: "$products.price" }
        }
      },
      {
        $project: {
          _id: 0,
          min: { $floor: "$minPrice" },
          max: { $ceil: "$maxPrice" },
        }
      }
    ])

    console.log(priceRange);
    
  }
}

export default new CategoryService();
