import { Document, model, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  image: string;
  slug: string;
}

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      require: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

categorySchema.index({ name: "text" });

export default model<ICategory>("Category", categorySchema);
