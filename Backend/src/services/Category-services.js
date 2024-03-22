import CategoryRepository from "../repositories/Category-repository.js";

class CategoryService {
  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async createCategory(category) {
    return await this.categoryRepository.create(category);
  }

  async getCategories() {
    try {
      const categories = await this.categoryRepository.getAll();
      return categories;
    } catch (error) {
      console.log(error);
    }
  }

  async getCategoryById(id) {
    return await this.categoryRepository.getById(id);
  }

  async updateCategory(id, category) {
    return await this.categoryRepository.update(id, category);
  }

  async deleteCategory(id) {
    return await this.categoryRepository.delete(id);
  }
}

export default CategoryService;
