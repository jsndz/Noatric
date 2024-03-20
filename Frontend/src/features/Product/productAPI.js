import axios from "axios";

export async function fetchAllProducts() {
  const apiUrl = "http://localhost:3000/api/v1/products";
  try {
    const response = await axios.get(apiUrl);
    console.log(response);
    return response;
  } catch (error) {
    console.log("error in fetching", error);
  }
}
