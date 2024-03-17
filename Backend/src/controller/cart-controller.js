import Cart from "../models/Cart.js";

export const fetchCartByUser = async (req, res) => {
  const {user} = req.query;
  try {
    const carts = await Cart.find({user:user}).populate("Cart").populate("user");
    return res.status(201).json({
      data: carts,
      message: "Successfully returned Carts",
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {},
      message: "Couldn't get Carts",
      success: false,
      err: { error },
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    const cart = await Cart.create(req.body);
    return res.status(201).json({
      data: cart,
      message: "Successfully created Cart",
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {},
      message: "Couldn't create Cart",
      success: false,
      err: { error },
    });
  }
};
export const updateCart = async (req, res) => {
  const {id} = req.params;
  try {
    const cart = await Cart.findByIdAndUpdate(id,req.body,{new:true}).populate("Product");
    
    return res.status(201).json({
      data: cart,
      message: "Successfully updated Cart by id",
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {},
      message: "Couldn't update Cart",
      success: false,
      err: { error },
    });
  }
};

export const deleteCart = async (req, res) => {
  
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    
    return res.status(201).json({
      data: cart,
      message: "Successfully got Cart by id",
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {},
      message: "Couldn't get Cart",
      success: false,
      err: { error },
    });
  }
};