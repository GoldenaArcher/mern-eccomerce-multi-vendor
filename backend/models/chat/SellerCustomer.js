const { model, Schema } = require("mongoose");

const sellerCustomerSchema = new Schema(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    customerIds: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Customer",
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = model("SellerCustomer", sellerCustomerSchema);
