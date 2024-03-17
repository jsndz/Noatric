import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  }
});

const virtual = CategorySchema.virtual("id");
virtual.get(function () {
  return this._id;
});
CategorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
const Category = mongoose.model("Category", CategorySchema);

export default Category;
