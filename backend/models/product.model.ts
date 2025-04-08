import { Schema, model, Document, Types } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  brand: string;
  price: number;
  discount: number;
  stock: number;
  images: string[];
  category: Types.ObjectId;
  seller: Types.ObjectId;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    stock: { type: Number, required: true },
    images: [{ type: String }],
    slug: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.index(
  {
    name: "text",
    description: "text",
    brand: "text",
    category: "text",
  },
  {
    weights: {
      name: 5,
      description: 3,
      brand: 2,
      category: 1,
    },
  }
);

const Product = model<IProduct>("Product", productSchema);

export default Product;
