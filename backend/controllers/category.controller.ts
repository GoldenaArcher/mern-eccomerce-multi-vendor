import { NextFunction, Request, Response } from "express";
import { CategoryService } from "@/services/category.service";
import { BadRequestError } from "@/errors";
import ResponseModel from "@/models/response.model";

class CategoryController {
  private categoryService: CategoryService;

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
  }

  async addCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const image = req.file;

      if (!name || !image) {
        return next(
          new BadRequestError("Category name and image are required.")
        );
      }

      const imagePath = `${(image as any).publicPath}/${image.filename}`;
      const category = await this.categoryService.createCategory(
        name.trim(),
        imagePath
      );

      return ResponseModel.created(
        "Category created successfully.",
        category
      ).send(res);
    } catch (err) {
      return next(err);
    }
  }

  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = (req.query.search as string) || "";

      const filter = search ? { name: { $regex: search, $options: "i" } } : {};

      const result = await this.categoryService.getAllCategories(
        page,
        limit,
        filter
      );

      return ResponseModel.ok(
        "Category fetches successfully.",
        result.categories,
        result.pagination
      ).send(res);
    } catch (err) {
      next(err);
    }
  }
}

export default CategoryController;
