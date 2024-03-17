import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  }
});

const virtual = BrandSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
BrandSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
const Brand = mongoose.model("Brand", BrandSchema);

export default Brand;
