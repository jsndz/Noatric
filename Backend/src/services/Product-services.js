import ProductRepository from "../repositories/Product-repository.js";

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(product) {
    return await this.productRepository.create(product);
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

  async getProductById(id) {
    return await this.productRepository.getById(id);
  }

  async updateProduct(id, product) {
    return await this.productRepository.update(id, product);
  }

  async deleteProduct(id) {
    return await this.productRepository.delete(id);
  }
}

export default ProductService;
