import { NextFunction, Request, Response } from "express";
import { CategoryService } from "@/services/category.service";
import { BadRequestError } from "@/errors";
import ResponseModel from "@/models/response.model";
import { deleteUploadedFiles } from "@/utils/upload.util";

class CategoryController {
  private categoryService: CategoryService;

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
  }

  async addCategory(req: Request, res: Response, next: NextFunction) {
    const image = req.file;

    try {
      const { name } = req.body;

      if (!name || !image) {
        deleteUploadedFiles(image);
        return next(
          new BadRequestError("Category name and image are required.")
        );
      }

      const category = await this.categoryService.createCategory(
        name.trim(),
        image
      );

      ResponseModel.created("Category created successfully.", category).send(
        res
      );
    } catch (err) {
      deleteUploadedFiles(image);
      return next(err);
    }
  }

  async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = (req.query.search as string) || "";
      const isAll = req.query.all === "true";
      const filter = search ? { name: { $regex: search, $options: "i" } } : {};

      if (isAll) {
        const result = await this.categoryService.getAllCategories({
          filter,
        });
        ResponseModel.ok("Fetched all categories", result.categories).send(res);
        return;
      }

      const result = await this.categoryService.getAllCategories({
        page,
        limit,
        filter,
      });

      ResponseModel.ok(
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
