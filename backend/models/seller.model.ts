import { model, Schema, Document, Types } from "mongoose";
import bcrypt from "bcrypt";

export interface ISeller extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
  paymentStatus: string;
  method: string;
  image: string;
  shop: Types.ObjectId;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

const sellerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      default: "seller",
    },
    status: {
      type: String,
      default: "pending",
    },
    paymentStatus: {
      type: String,
      default: "inactive",
    },
    method: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
      unique: true, // ensures one-to-one
      sparse: true, // allow null for sellers without shop
    },
  },
  { timestamps: true }
);

sellerSchema.methods.comparePassword = async function (
  enteredPassword: string
) {
  return bcrypt.compare(enteredPassword, this.password);
};

sellerSchema.pre<ISeller>(
  "save",
  async function (this: ISeller, next: Function) {
    if (!this.isModified("password")) {
      return next();
    }

    const bcrypt = require("bcrypt");
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }
);

export default model<ISeller>("Seller", sellerSchema);
