import mongoose from "mongoose";

export const validateCartId = (req, res, next) => {
  const { cartId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cartId)) {
    return res.status(400).json({
      data: {},
      success: false,
      message: "Invalid cart ID format",
      err: {},
    });
  }

  next();
};
