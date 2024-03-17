import mongoose, { Schema } from "mongoose";

const CartSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref:'Product',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref:'User',
    required: true,
  },
});

const virtual = CartSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
CartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
const Cart = mongoose.model("Cart", CartSchema);

export default Cart;
