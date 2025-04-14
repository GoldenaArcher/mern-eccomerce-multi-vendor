import { Schema, model, Types, Document } from "mongoose";

export interface IShop extends Document {
  seller: Types.ObjectId;
  name: string;
  country: string;
  state: string;
  city: string;
  image?: string;
}

const shopSchema = new Schema<IShop>(
  {
    seller: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
      unique: true, // enforce one-to-one
    },
    name: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

export default model<IShop>("Shop", shopSchema);
