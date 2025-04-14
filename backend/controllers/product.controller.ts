import { NextFunction, Request, Response } from "express";
import _ from "lodash";

import { ProductService } from "@/services/product.service";
import ResponseModel from "@/models/response.model";
import { UploadedFileWithPath } from "@/types/upload";
import { deleteImagePaths, deleteUploadedFiles } from "@/utils/upload.util";
import { ExtendedRequest } from "@/types/auth";
import {
  getValidatedProductPayload,
  validateProductInput,
} from "@/validators/product.validator";

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

      const { name, description, price, stock, category, brand, discount } =
        body;

      validateProductInput(body, images);

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

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    const images = req.files as UploadedFileWithPath[];
    try {
      const {
        body,
        params: { productId },
        user: { id: sellerId },
      } = req as ExtendedRequest;

      const existingProduct = await this.productService.verifyOwnershipOrThrow(
        productId,
        sellerId
      );

      const bodyPayload = getValidatedProductPayload(body);
      const mergedImages = [
        ...(existingProduct.images || []),
        ...(images || []).map((f) => f.publicPath),
      ];

      validateProductInput(
        { ...existingProduct, ...bodyPayload },
        mergedImages
      );

      const product = await this.productService.updateProduct(productId, {
        ...bodyPayload,
        images: mergedImages,
        sellerId,
      });

      const removedImages = _.difference(existingProduct.images, mergedImages);

      await deleteImagePaths(removedImages); // 忽略失败

      ResponseModel.ok("Product updated successfully.", product).send(res);
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

  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;
      const product = await this.productService.getProductById(productId);
      ResponseModel.ok("Product fetched successfully.", product).send(res);
    } catch (err) {
      return next(err);
    }
  }
}

export default ProductController;
