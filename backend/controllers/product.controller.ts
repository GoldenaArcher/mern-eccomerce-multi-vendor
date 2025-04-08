import { NextFunction, Request, Response } from "express";
import { ProductService } from "@/services/product.service";
import { BadRequestError } from "@/errors";
import ResponseModel from "@/models/response.model";
import { UploadedFileWithPath } from "@/types/upload";
import { deleteUploadedFiles } from "@/utils/upload.util";
import { ExtendedRequest } from "@/types/auth";

class ProductController {
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  async addProduct(req: Request, res: Response, next: NextFunction) {
    const images = req.files as UploadedFileWithPath[];

    try {
      const {
        body,
        user: { id: sellerId },
      } = req as ExtendedRequest;

      const { name, description, price, stock, category, brand } = body;

      const discount = Number(body.discount?.trim()) || 0;

      if (
        !images ||
        !images.length ||
        !name.trim() ||
        !description.trim() ||
        !price.trim() ||
        !stock.trim() ||
        !category.trim() ||
        !brand.trim()
      ) {
        deleteUploadedFiles(images);
        return next(
          new BadRequestError(
            "Product name, description, discount, price, stock, category, brand and images are required."
          )
        );
      }

      if (isNaN(discount) || isNaN(Number(price)) || isNaN(Number(stock))) {
        deleteUploadedFiles(images);
        return next(
          new BadRequestError("Discount, price and stock must be a number.")
        );
      }

      if (Number(discount) < 0 || Number(discount) > 100) {
        deleteUploadedFiles(images);
        return next(new BadRequestError("Discount must be between 0 and 100."));
      }

      if (Number(price) < 0) {
        deleteUploadedFiles(images);
        return next(new BadRequestError("Price must be greater than 0."));
      }

      if (Number(stock) < 0) {
        deleteUploadedFiles(images);
        return next(new BadRequestError("Stock must be greater than 0."));
      }

      const product = await this.productService.createProduct({
        name,
        description,
        discount,
        price,
        stock,
        category,
        brand,
        images,
        sellerId,
      });

      ResponseModel.created("Product created successfully.", product).send(res);
    } catch (err) {
      deleteUploadedFiles(images);
      return next(err);
    }
  }

  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = (req.query.search as string) || "";
      const isAll = req.query.all === "true";
      const filter = search ? { name: { $regex: search, $options: "i" } } : {};

      if (isAll) {
        const results = await this.productService.getAllProducts();
        ResponseModel.ok(
          "Products fetched successfully.",
          results.products
        ).send(res);
        return;
      }

      const result = await this.productService.getAllProducts({
        page,
        limit,
        filter,
      });

      ResponseModel.ok(
        "Products fetched successfully.",
        result.products,
        result.pagination
      ).send(res);
    } catch (err) {
      return next(err);
    }
  }
}

export default ProductController;
