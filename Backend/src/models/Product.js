import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    //required: true,
  },
  description: {
    type: String,
    //required: true,
  },
  price: {
    type: Number,
    min: [1, "wrong min price"],
    max: [10000, "wrong max price"],
    //required: true,
  },
  discountPercentage: {
    type: Number,
    min: [0, "wrong min discount"],
    max: [99, "wrong max discount"],
    //required: true,
  },
  rating: {
    type: Number,
    min: [0, "wrong min rating"],
    max: [5, "wrong max rating"],
    default: 0,
    //required: true,
  },
  stock: {
    type: Number,
    min: [0, "wrong min stock"],
    default: 0,
    //required: true,
  },
  brand: {
    type: String,
    //required: true,
  },
  category: {
    type: String,
    //required: true,
  },
  thumbnail: {
    type: String,
    //required: true,
  },
  images: {
    type: [String],
    //required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

const virtual = ProductSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
ProductSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
const Product = mongoose.model("Product", ProductSchema);

export default Product;
