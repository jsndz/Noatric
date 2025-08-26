import mongoose from "mongoose";
class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const result = await this.model.create(data);

      return result;
    } catch (error) {
      console.log("Something went wrong in the crud layer");
      throw { error };
    }
  }

  async get(modelId) {
    try {
      const result = await this.model.findById(modelId);
      return result;
    } catch (error) {
      console.log("Something went wrong in the crud layer");
      throw { error };
    }
  }
  async find(query) {
    try {
      const result = await this.model.find(query);
      return result;
    } catch (error) {
      console.log("Something went wrong in the crud layer");
      throw { error };
    }
  }
  async findOne(query) {
    try {
      const result = await this.model.findOne(query);
      return result;
    } catch (error) {
      console.log("Something went wrong in the crud layer");
      throw { error };
    }
  }
  async findById(query) {
    try {
      const result = await this.model.findById(query);
      return result;
    } catch (error) {
      console.log("Something went wrong in the crud layer");
      throw { error };
    }
  }
  async getAll() {
    try {
      const result = await this.model.find();
      return result;
    } catch (error) {
      console.log("Something went wrong in the crud layer", error);
      throw { error };
    }
  }

  async update(modelId, data) {
    try {
      const result = await this.model.update(data, {
        where: {
          id: modelId,
        },
      });
      return result;
    } catch (error) {
      console.log("Something went wrong in the crud layer", error);
      throw { error };
    }
  }
}
export default CrudRepository;
