import Brand from "../models/Brand.js";

export const fetchAllBrand = async (req, res) => {
  try {
    const brands = await Brand.find({})
    return res.status(201).json({
      data: brands,
      message: "Successfully returned Brands",
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {},
      message: "Couldn't get Brands",
      success: false,
      err: { error },
    });
  }
};

export const createBrand = async (req, res) => {
  try {
    const brand = new Brand(req.body);
    await brand.save();
    return res.status(201).json({
      data: brand,
      message: "Successfully created Brand",
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {},
      message: "Couldn't create Brand",
      success: false,
      err: { error },
    });
  }
};
