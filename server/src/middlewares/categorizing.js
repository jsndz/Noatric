import { connect } from "../config/database.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

connect();
const extractAndInsertCategory = async () => {
  try {
    const products = await Product.find({});

    const categoryNames = Array.from(
      new Set(products.map((product) => product.category))
    );

    for (const categoryName of categoryNames) {
      await Category.create({ label: categoryName });
      console.log(`category "${categoryName}" inserted successfully.`);
    }

    console.log("All category names extracted and inserted successfully.");
  } catch (error) {
    console.error("Error extracting and inserting category:", error);
  }
};

extractAndInsertCategory();
