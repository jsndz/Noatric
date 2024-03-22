import ProductService from "../services/Product-services.js";

async function createProduct(req, res) {
  try {
    const productService = new ProductService();
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error });
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

export { createProduct, getProducts };
