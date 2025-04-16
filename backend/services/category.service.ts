import slugify from "slugify";
import CategoryModel from "@/models/category.model";
import { sanitizeDocument } from "@/utils/mongoose.util";
import { UploadedFileWithPath } from "@/types/upload";

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
}

export default new CategoryService();
