import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  image: string;
  role: string;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

const adminSchema = new Schema(
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
    image: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true }
);

adminSchema.methods.comparePassword = async function (enteredPassword: string) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default model<IAdmin>("Admin", adminSchema);
