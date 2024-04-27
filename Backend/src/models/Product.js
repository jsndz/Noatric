import mongoose from "mongoose";
import Brand from "./Brand.js";
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
    // required: true,
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

ProductSchema.post("save", async function (doc, next) {
  try {
    const Brand = mongoose.model("Brand");
    const Category = mongoose.model("Category");
    const existingBrand = await Brand.findOne({ label: doc.brand });
    const existingCategory = await Category.findOne({ label: doc.category });
    if (!existingBrand) {
      await Brand.create({ label: doc.brand });
    }
    if (!existingCategory) {
      await Category.create({ label: doc.category });
    }
    next();
  } catch (error) {
    next(error);
  }
});
const Product = mongoose.model("Product", ProductSchema);

export default Product;
