import { connect } from "../config/database.js";
import Product from "../models/Product.js";
import Brand from "../models/Brand.js";

connect();
const extractAndInsertBrands = async () => {
  try {
    // Find all products
    const products = await Product.find({});

    // Extract unique brand names
    const brandNames = Array.from(
      new Set(products.map((product) => product.brand))
    );

    // Insert brand names into the Brand model
    for (const brandName of brandNames) {
      await Brand.create({ label: brandName });
      console.log(`Brand "${brandName}" inserted successfully.`);
    }

    console.log("All brand names extracted and inserted successfully.");
  } catch (error) {
    console.error("Error extracting and inserting brands:", error);
  }
};

// Step 3: Call the function to extract and insert brands
extractAndInsertBrands();
