import ProductRepository from "../repositories/Product-repository.js";

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(data) {
    try {
      const product = await this.productRepository.create(data);
      return product;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw { error };
    }
  }

  async getProducts() {
    try {
      const products = await this.productRepository.getAll();

      return products;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw { error };
    }
  }
  async getProductByFilter(category, brand, page, limit) {
    try {
      const products = await this.productRepository.getProductByFilter(
        category,
        brand
      );

      return products;
    } catch (error) {
      console.log("Something went wrong in the service layer", error);
      throw { error };
    }
  }
  async getProductById(id) {
    try {
      const product = await this.productRepository.get(id);

      return product;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw { error };
    }
  }

  async updateProduct(id, product) {
    try {
      const updatedProduct = await this.productRepository.updateProduct(
        id,
        product
      );
      return updatedProduct;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw { error };
    }
  }

  async deleteProduct(id) {
    try {
      const product = await this.productRepository.deleteProduct(id);
      return product;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw { error };
    }
  }
}

export default ProductService;
