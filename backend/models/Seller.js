const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");

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
    payment: {
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
    ShopInfo: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

sellerSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

sellerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const bcrypt = require("bcrypt");
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = model("Seller", sellerSchema);
