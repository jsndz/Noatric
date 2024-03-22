import BrandRepository from "../repositories/Brand-repository.js";

class BrandService {
  constructor() {
    this.brandRepository = new BrandRepository();
  }

  async createBrand(brand) {
    return await this.brandRepository.create(brand);
  }

  async getBrands() {
    try {
      const brands = await this.brandRepository.getAll();
      return brands;
    } catch (error) {
      console.log("Something went wrong in Service layer");
      console.log(error);
    }
  }

  async getBrandById(id) {
    return await this.brandRepository.getById(id);
  }

  async updateBrand(id, brand) {
    return await this.brandRepository.update(id, brand);
  }

  async deleteBrand(id) {
    return await this.brandRepository.delete(id);
  }

  async deleteAllBrands() {
    return await this.brandRepository.deleteAll();
  }
}

export default BrandService;
