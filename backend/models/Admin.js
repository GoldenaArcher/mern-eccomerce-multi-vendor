const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const { generateAuthToken } = require("../utils/jwtUtils");

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
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

adminSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

adminSchema.methods.generateAuthToken = function () {
  return generateAuthToken(this);
};

module.exports = model("Admin", adminSchema);
