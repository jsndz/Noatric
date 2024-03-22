import axios from "axios";

export async function fetchAllProducts() {
  const apiUrl = "http://localhost:3000/api/v1/products";
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.log("error in fetching", error);
  }
}

export async function fetchAllBrands() {
  const apiUrl = "http://localhost:3000/api/v1/brands";
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.log("error in fetching", error);
  }
}

export async function fetchAllCategories() {
  const apiUrl = "http://localhost:3000/api/v1/categories";
  try {
    const response = await axios.get(apiUrl);

    return response;
  } catch (error) {
    console.log("error in fetching", error);
  }
}
