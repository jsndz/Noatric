import ProductService from "../services/Product-services.js";

async function createProduct(req, res) {
  try {
    const productService = new ProductService();
    const product = await productService.createProduct(req.body);
    return res.status(201).json({
      data: product,
      success: true,
      message: "successfully returned a products",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "couldn't create a product",
      err: { error },
    });
  }
}

async function getProducts(req, res) {
  try {
    const productService = new ProductService();
    const products = await productService.getProducts();
    return res.status(201).json({
      data: products,
      success: true,
      message: "successfully returned a products",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "couldn't return a products",
      err: { error },
    });
  }
}
async function getProductById(req, res) {
  try {
    const productService = new ProductService();

    const product = await productService.getProductById(req.params.id);

    return res.status(201).json({
      data: product,
      success: true,
      message: "successfully returned a product",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "couldn't return a product",
      err: { error },
    });
  }
}
async function getProductsByFilter(req, res) {
  try {
    const productService = new ProductService();
    const allproducts = await productService.getProductByFilter(
      req.query.category,
      req.query.Brand,
      req.query.page,
      req.query.limit
    );
    const totalCount = allproducts.length;
    const last = req.query.page * req.query.limit;
    const first = (req.query.page - 1) * req.query.limit;
    const products = allproducts.slice(first, last);
    res.setHeader("X-Total-Count", totalCount);
    return res.status(201).json({
      data: products,
      success: true,
      message: "successfully returned  products",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "couldn't return a products through filter",
      err: { error },
    });
  }
}
async function updatedProduct(req, res) {
  try {
    const productService = new ProductService();

    const updateProduct = await productService.updateProduct(
      req.params.id,
      req.body
    );

    return res.status(201).json({
      data: updateProduct,
      success: true,
      message: "successfully returned a product",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "couldn't return a product",
      err: { error },
    });
  }
}
async function deleteProduct(req, res) {
  try {
    const productService = new ProductService();

    const product = await productService.deleteProduct(req.params.id);

    return res.status(201).json({
      data: product,
      success: true,
      message: "successfully deleted a product",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "couldn't delete a product",
      err: { error },
    });
  }
}
export {
  createProduct,
  getProducts,
  getProductsByFilter,
  getProductById,
  updatedProduct,
  deleteProduct,
};
