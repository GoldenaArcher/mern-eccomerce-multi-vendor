import { UploadedFileWithPath } from "@/types/upload";
import { BadRequestError } from "@/errors";

export interface ProductInput {
  name: string;
  description: string;
  price: string | number;
  discount?: string | number;
  stock: string | number;
  brand: string;
  category: string;
}

export const getValidatedProductPayload = (body: ProductInput) => ({
  name: body.name.trim(),
  description: body.description.trim(),
  brand: body.brand.trim(),
  category: body.category.trim(),
  price: Number(body.price),
  discount: Number(body.discount || 0),
  stock: Number(body.stock),
});

export const validateProductInput = (
  body: ProductInput,
  images: UploadedFileWithPath[] = []
) => {
  const {
    name = "",
    description = "",
    discount = "",
    price = "",
    stock = "",
    category = "",
    brand = "",
  } = body;

  const discountValue = Number(discount?.toString().trim() || 0);
  const priceValue = Number(price);
  const stockValue = Number(stock);

  if (!images || images.length === 0) {
    throw new BadRequestError("At least one product image is required.");
  }

  if (images.length > 5) {
    throw new BadRequestError("Maximum of 5 product images are allowed.");
  }

  if (
    !name.trim() ||
    !description.trim() ||
    !category.trim() ||
    !brand.trim() ||
    !price.toString().trim() ||
    !stock.toString().trim()
  ) {
    throw new BadRequestError(
      "Product name, description, price, stock, category and brand are required."
    );
  }

  if (isNaN(discountValue) || isNaN(priceValue) || isNaN(stockValue)) {
    throw new BadRequestError(
      "Discount, price, and stock must be valid numbers."
    );
  }

  if (discountValue < 0 || discountValue > 100) {
    throw new BadRequestError("Discount must be between 0 and 100.");
  }

  if (priceValue < 0) {
    throw new BadRequestError("Price must be greater than 0.");
  }

  if (stockValue < 0) {
    throw new BadRequestError("Stock must be greater than 0.");
  }
};
