import Category from "../models/Category.js";

export const fetchCategory = async (req, res) => {
  try {
    const categories = await Category.find({})
    return res.status(201).json({
      data: categories,
      message: "Successfully returned categories",
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {},
      message: "Couldn't got categories",
      success: false,
      err: { error },
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    return res.status(201).json({
      data: category,
      message: "Successfully created Category",
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {},
      message: "Couldn't create Category",
      success: false,
      err: { error },
    });
  }
};