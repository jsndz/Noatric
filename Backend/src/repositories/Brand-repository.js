import CrudRepository from "./Crud-repository.js";

import Brand from "../models/Brand.js";

class BrandRepository extends CrudRepository {
  constructor() {
    super(Brand);
  }
}

export default BrandRepository;
