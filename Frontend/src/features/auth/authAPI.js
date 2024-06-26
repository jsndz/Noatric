import axios from "axios";

export const createUser = async (data) => {
  try {
    const response = await axios.post(" /api/v1/auth/signup", data);
    return response.data;
  } catch (error) {
    console.log("Error in creating user", error);
    throw error;
  }
};

export const checkUser = async (data) => {
  try {
    const response = await axios.post(" /api/v1/auth/login", data);
    return response.data.data;
  } catch (error) {
    console.log("Error in login of user", error);
    throw error;
  }
};
export const addAddress = async (address) => {
  try {
    const response = await axios.patch(` /api/v1/auth/address`, address);
    return response.data;
  } catch (error) {
    console.log("Error in adding Address", error);
  }
};
export const getAddresses = async () => {
  try {
    const response = await axios.get(` /api/v1/auth/address`);
    return response.data;
  } catch (error) {
    console.log("Error in adding Address", error);
  }
};
export const getUserInfo = async () => {
  try {
    const response = await axios.get(` /api/v1/user`);
    return response.data;
  } catch (error) {
    console.log("Error in getting user", error);
  }
};

export const removeAddress = async (index) => {
  try {
    const response = await axios.delete(` /api/v1/user/address/${index}`);
    return response.data;
  } catch (error) {
    console.log("Error in removing Address", error);
  }
};

export const editAddress = async (index, address) => {
  try {
    const response = await axios.patch(
      ` /api/v1/user/address/${index}`,
      address
    );
    return response.data;
  } catch (error) {
    console.log("Error in editing Address", error);
  }
};

export const resetPassword = async (email) => {
  try {
    const response = await axios.post(` /api/v1/auth/reset-password/${email}`);
    return response.data.data;
  } catch (error) {
    console.log("Eror", error.response.data);
  }
};
export const setPassword = async (userData) => {
  try {
    const response = await axios.post(
      ` /api/v1/auth/reset-password/`,
      userData
    );
    return response.data;
  } catch (error) {
    console.log("Error", error.response.data);
  }
};

export const setName = async (name) => {
  try {
    const response = await axios.patch(` /api/v1/user/edit-name/${name}`);
    return response.data;
  } catch (error) {
    console.log("Eror", error.response.data);
  }
};
