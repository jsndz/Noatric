import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    return res.status(201).json({
      data: product,
      message: "Successfully created Product",
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {},
      message: "Couldn't create Product",
      success: false,
      err: { error },
    });
  }
};

export const fetchAllProducts = async (req, res) => {
  let condition = {};
  if(!req.query.admin){
    condition.deleted = {$ne:true}
  }
    let query = Product.find(condition);
    const totalDocsQuery = Product.find(condition); 
    if (req.query.category) {
      query = query.find({ category: req.query.category });
      totalDocsQuery = totalDocsQuery.find({ category: req.query.category });
    }
    if (req.query.brand) {
      query = query.find({ brand: req.query.brand });
      totalDocsQuery = totalDocsQuery.find({ brand: req.query.brand });
    }
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }
    
  
    if (req.query._page && req.query._limit) {
      const page = req.query._page;
      const pageSize = req.query._limit;
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }
  
    try {
      const response = await query.exec();
      const totalDocs = await totalDocsQuery.count().exec(); 
      res.set('X-total-count', totalDocs);
      return res.status(200).json({
        data: response,
        message: "Successfully returned Products",
        success: true,
        err: {},
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: {},
        message: "Couldn't get Products",
        success: false,
        err: { error },
      });
    }
  };
  


  export const fetchProductById = async (req, res) => {
    const {id} = req.params;
    try {
      
      const product = await Product.findById(id);
      
      return res.status(201).json({
        data: product,
        message: "Successfully got Product by id",
        success: true,
        err: {},
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: {},
        message: "Couldn't get Product",
        success: false,
        err: { error },
      });
    }
  };


  export const updateProduct = async (req, res) => {
    const {id} = req.params;
    try {
      const product = await Product.findByIdAndUpdate(id,req.body,{new:true});
      
      return res.status(201).json({
        data: product,
        message: "Successfully got Product by id",
        success: true,
        err: {},
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: {},
        message: "Couldn't get Product",
        success: false,
        err: { error },
      });
    }
  };