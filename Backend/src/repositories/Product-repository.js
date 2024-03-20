import CrudRepository from "./Crud-repository.js";

import Product from "../models/Product.js";

class ProductRepository extends CrudRepository {
  constructor() {
    super(Product);
  }
}

export default ProductRepository;
