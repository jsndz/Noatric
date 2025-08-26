import axios from "axios";
const baseURL =
  import.meta.env.VITE_ENV === `production`
    ? import.meta.env.VITE_PROD_BASE_URL
    : import.meta.env.VITE_DEV_BASE_URL;

export async function fetchAllProducts() {
  const apiUrl = `${baseURL}/api/v1/products`;
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.log(`error in fetching`, error);
  }
}

export async function fetchAllBrands() {
  const apiUrl = `${baseURL}/api/v1/brands`;
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.log(`error in fetching`, error);
  }
}

export async function fetchAllCategories() {
  const apiUrl = `${baseURL}/api/v1/categories`;
  try {
    const response = await axios.get(apiUrl);

    return response;
  } catch (error) {
    console.log(`error in fetching`, error);
  }
}
export async function fetchAllProductsById(id) {
  const apiUrl = `${baseURL}/api/v1/products/${id}`;
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.log(`error in fetching by id`, error);
  }
}
export async function fetchProductsByFilters(filter, pagin) {
  const apiUrl = `${baseURL}/api/v1/products/productsByFilter`;
  const params = new URLSearchParams(filter);
  if (pagin) {
    params.append(`page`, pagin.page);
    params.append(`limit`, pagin.limit);
  }
  try {
    const res = await axios.get(apiUrl, { params });
    const totalItems = res.headers[`x-total-count`];

    const response = { ...res.data, totalItems };

    return response;
  } catch (error) {
    console.log(`Error in fetching in product APi`, error);
  }
}
export async function editProduct(id, data) {
  try {
    const response = await axios.patch(
      `${baseURL}/api/v1/products/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(`Error in fetching in product APi`, error);
  }
}
export async function createProduct(data) {
  try {
    const response = await axios.post(`${baseURL}/api/v1/products`, data);
    return response.data;
  } catch (error) {
    console.log(`Error in fetching in product APi`, error);
  }
}
export async function deleteProduct(id) {
  try {
    const response = await axios.delete(`${baseURL}/api/v1/products/${id}`);
    return response.data;
  } catch (error) {
    console.log(`Error in fetching in product APi`, error);
  }
}
