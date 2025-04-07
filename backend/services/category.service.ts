import slugify from "slugify";
import CategoryModel, { ICategory } from "@/models/category.model";

export class CategoryService {
  async createCategory(name: string, imagePath: string): Promise<ICategory> {
    const slug = slugify(name, { lower: true });

    const category = await CategoryModel.create({
      name,
      slug,
      image: imagePath,
    });

    return category;
  }

  async getAllCategories(
    page: number,
    limit: number,
    filter: Record<string, any> = {}
  ): Promise<{
    categories: ICategory[];
    pagination: {
      totalItems: number;
      currentPage: number;
      perPage: number;
      totalPages: number;
    };
  }> {
    const totalItems = await CategoryModel.countDocuments(filter);

    const categories = await CategoryModel.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return {
      categories,
      pagination: {
        totalItems,
        currentPage: page,
        perPage: limit,
        totalPages: Math.ceil(totalItems / limit),
      },
    };
  }
}

export default new CategoryService();
