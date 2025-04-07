import { model, Schema } from "mongoose";

const sellerCustomerRelSchema = new Schema(
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

export default model("SellerCustomerRel", sellerCustomerRelSchema);
