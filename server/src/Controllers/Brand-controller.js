import BrandService from "../services/Brand-services.js";

async function createBrand(req, res) {
  try {
    const brandService = new BrandService();
    const brand = req.body;
    const newBrand = await brandService.createBrand(brand);
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function getBrands(req, res) {
  try {
    const brandService = new BrandService();
    const brands = await brandService.getBrands();
    return res.status(201).json({
      data: brands,
      success: true,
      message: "successfully returned a brands",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "couldn't return  brands",
      err: { error },
    });
  }
}

async function getBrandById(req, res) {
  try {
    const brandService = new BrandService();
    const id = req.params.id;
    const brand = await brandService.getBrandById(id);
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function updateBrand(req, res) {
  try {
    const brandService = new BrandService();
    const id = req.params.id;
    const brand = req.body;
    const updatedBrand = await brandService.updateBrand(id, brand);
    res.status(200).json(updatedBrand);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function deleteBrand(req, res) {
  try {
    const brandService = new BrandService();
    const id = req.params.id;
    await brandService.deleteBrand(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function deleteAllBrands(req, res) {
  try {
    const brandService = new BrandService();
    await brandService.deleteAllBrands();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
  deleteAllBrands,
};
