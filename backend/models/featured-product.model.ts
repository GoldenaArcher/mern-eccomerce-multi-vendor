import { Document, model, Schema } from "mongoose";

export interface IFeaturedProduct extends Document {
  productId: Schema.Types.ObjectId;
  featureType: string[];
  displayOrder: number;
}

const featuredProductSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    featureType: {
      type: [String],
      enum: ["latest", "topRated", "discount", "featured"],
      required: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const FeaturedProduct = model<IFeaturedProduct>(
  "FeaturedProduct",
  featuredProductSchema
);

export default FeaturedProduct;
