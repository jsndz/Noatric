import Category from "../models/Category.js";
import CrudRepository from "./Crud-repository.js";

class CategoryRepository extends CrudRepository {
  constructor() {
    super(Category);
  }
}

export default CategoryRepository;
