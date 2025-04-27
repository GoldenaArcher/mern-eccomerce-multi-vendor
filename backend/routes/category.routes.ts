import { Router } from "express";
import CategoryController from "@/controllers/category.controller";
import categoryService from "@/services/category.service";
import { adminAuthMiddleware } from "@/middlewares/auth-aggregate.middleware";
import upload from "@/middlewares/upload.middleware";
// import authMiddleware from "@/middlewares/auth.middleware";

const categoryController = new CategoryController(categoryService);

const router = Router();

router.post(
  "/admin/categories",
  adminAuthMiddleware,
  upload.single("image"),
  categoryController.addCategory.bind(categoryController)
);
router.get(
  "/categories",
  categoryController.getAllCategories.bind(categoryController)
);

export default router;
