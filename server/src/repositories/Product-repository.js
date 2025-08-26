import CrudRepository from "./Crud-repository.js";

import Product from "../models/Product.js";
import Brand from "../models/Brand.js";
import Category from "../models/Category.js";
class ProductRepository extends CrudRepository {
  constructor() {
    super(Product);
  }
  async getProductByFilter(categories, brands) {
    try {
      const query = {};
      if (categories && categories.length > 0) {
        const categoryArray = categories.split(",");
        query.category = { $in: categoryArray };
      }
      if (brands && brands.length > 0) {
        const brandArray = brands.split(",");
        query.brand = { $in: brandArray };
      }
      const products = await this.model.find(query);
      return products;
    } catch (error) {
      console.log("Something went wrong in the product repository", error);
      throw { error };
    }
  }
  async updateProduct(modelId, data) {
    try {
      const result = await Product.findByIdAndUpdate(modelId, data, {
        new: true,
      });
      return result;
    } catch (error) {
      console.log("Something went wrong in the crud layer", error);
      throw { error };
    }
  }
  async deleteProduct(id) {
    try {
      const product = await Product.findById(id);
      if (!product) {
        throw new Error("Product not found");
      }
      await Brand.deleteOne({ label: product.brand });
      await Category.deleteOne({ label: product.category });
      const result = await Product.findByIdAndDelete(id);
      return result;
    } catch (error) {
      console.log("Something went wrong in the crud layer", error);
      throw { error };
    }
  }
  async decreaseStock(id, quantity) {
    try {
      const product = await Product.findById(id);
      if (product.stock < quantity) {
        throw new Error(`Only ${quantity} stock for product ${product.title}`);
      } else {
        product.stock -= quantity;
      }
      await product.save();
    } catch (error) {
      console.log("Something went wrong in the crud layer", error);
      throw { error };
    }
  }
}

export default ProductRepository;
