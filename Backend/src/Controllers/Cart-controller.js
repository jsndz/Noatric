import CartService from "../services/Cart-services.js";

async function addCartItem(req, res) {
  try {
    const cartService = new CartService();
    const cartId = req.params.id;
    const productId = Object.keys(req.body)[0];

    const updatedCart = await cartService.addCartItem(cartId, productId);

    return res.status(201).json({
      data: updatedCart,
      success: true,
      message: "successfully added item to cart",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "couldn't add item to cart",
      err: { error },
    });
  }
}

async function getTotalProducts(req, res) {
  try {
    const cartService = new CartService();
    const totalProducts = await cartService.getTotalProducts(req.params.id);

    return res.status(201).json({
      data: totalProducts,
      success: true,
      message: "successfully returned total products",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "couldn't return total products",
      err: { error },
    });
  }
}

async function getProducts(req, res) {
  try {
    const cartService = new CartService();
    const products = await cartService.getProducts(req.params.id);

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
      message: "couldn't return products",
      err: { error },
    });
  }
}
async function removeProduct(req, res) {
  try {
    const cartService = new CartService();
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    const updatedCart = await cartService.removeProduct(cartId, productId);
    return res.status(201).json({
      data: updatedCart,
      success: true,
      message: "successfully removed item from cart",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "couldn't remove item from cart",
      err: { error },
    });
  }
}

async function increaseQuantity(req, res) {
  try {
    const cartService = new CartService();
    const cartId = req.params.cartId;
    const productId = req.params.productId;

    const updatedCart = await cartService.increaseQuantity(cartId, productId);
    return res.status(201).json({
      data: updatedCart,
      success: true,
      message: "successfully updated quantity",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "couldn't update quantity",
      err: { error },
    });
  }
}
async function decreaseQuantity(req, res) {
  try {
    const cartService = new CartService();
    const cartId = req.params.cartId;
    const productId = req.params.productId;

    const updatedCart = await cartService.decreaseQuantity(cartId, productId);
    return res.status(201).json({
      data: updatedCart,
      success: true,
      message: "successfully updated quantity",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "couldn't update quantity",
      err: { error },
    });
  }
}

async function emptyCart(req, res) {
  try {
    const cartService = new CartService();
    const cartId = req.params.id;
    const isEmpty = await cartService.emptyCart(cartId);
    return res.status(201).json({
      data: isEmpty,
      success: true,
      message: "successfully updated quantity",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "couldn't update quantity",
      err: { error },
    });
  }
}
export {
  addCartItem,
  getTotalProducts,
  getProducts,
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  emptyCart,
};
