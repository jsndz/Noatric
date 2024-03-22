import CategoryService from "../services/Category-services.js";

async function createCategory(req, res) {
  const categoryService = new CategoryService();
  const category = req.body;

  try {
    const newCategory = await categoryService.createCategory(category);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function getCategories(req, res) {
  const categoryService = new CategoryService();

  try {
    const categories = await categoryService.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function getCategoryById(req, res) {
  const categoryService = new CategoryService();
  const id = req.params.id;

  try {
    const category = await categoryService.getCategoryById(id);
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function updateCategory(req, res) {
  const categoryService = new CategoryService();
  const id = req.params.id;
  const category = req.body;

  try {
    const updatedCategory = await categoryService.updateCategory(id, category);
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function deleteCategory(req, res) {
  const categoryService = new CategoryService();
  const id = req.params.id;

  try {
    await categoryService.deleteCategory(id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error });
  }
}

export {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
