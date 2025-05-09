import { Document, Types } from "mongoose";
import { SearchPaginationProps } from "./pagination";

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

export interface GetAllProductsOptions extends SearchPaginationProps {
  categories?: string[];
  priceLow?: number;
  priceHigh?: number;
  sortBy?: string;
}
