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
export async function fetchAllProductsById(id) {
  const apiUrl = `http://localhost:3000/api/v1/products/${id}`;
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.log("error in fetching by id", error);
  }
}
export async function fetchProductsByFilters(filter, pagin) {
  const apiUrl = "http://localhost:3000/api/v1/productsByFilter";
  const params = new URLSearchParams(filter);
  if (pagin) {
    params.append("page", pagin.page);
    params.append("limit", pagin.limit);
  }
  try {
    const res = await axios.get(apiUrl, { params });
    const totalItems = res.headers["x-total-count"];
    const response = { ...res.data, totalItems };

    return response;
  } catch (error) {
    console.log("Error in fetching in product APi", error);
  }
}
export async function editProduct(id, data) {
  try {
    const response = await axios.patch(
      `http://localhost:3000/api/v1/product/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log("Error in fetching in product APi", error);
  }
}
export async function createProduct(data) {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/v1/product`,
      data
    );
    return response.data;
  } catch (error) {
    console.log("Error in fetching in product APi", error);
  }
}
export async function deleteProduct(id) {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/v1/product/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Error in fetching in product APi", error);
  }
}
