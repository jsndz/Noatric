import mongoose, { Schema } from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, default: 0 },
    paymentIntentClientSecret: { type: String },
    totalItems: { type: Number, default: 0 },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    paymentMethod: {
      type: String,
      enum: ["cash", "card"],
      default: "cash",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "delivered", "cancelled"],
      default: "pending",
    },
    selectedAddress: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

OrderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
