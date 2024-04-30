import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addAddress,
  checkUser,
  createUser,
  getAddresses,
  getUserInfo,
  removeAddress,
  editAddress,
  resetPassword,
  setPassword,
  setName,
} from "./authAPI";
import { setCartId } from "../Cart/cartSlice";
const initialState = {
  access_token: null,
  address: [],
  status: "idle",
  error: null,
  userInfo: null,
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData, thunkAPI) => {
    try {
      const response = await createUser(userData);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.token}`;

      thunkAPI.dispatch(setCartId(response.cartId));

      return response;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return thunkAPI.rejectWithValue("Something is wrong with API ");
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await checkUser(userData);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.token}`;

      thunkAPI.dispatch(setCartId(response.cartId));
      return response;
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response && error.response.data) {
        return thunkAPI.rejectWithValue(error.response.data.err);
      } else {
        return thunkAPI.rejectWithValue("Unknown error occurred");
      }
    }
  }
);
export const addAddressAsync = createAsyncThunk(
  "user/addAddress",
  async (address, thunkAPI) => {
    try {
      const response = await addAddress(address);
      return response.data;
    } catch (error) {
      console.error("Error during getting address:", error);
      return thunkAPI.rejectWithValue("Something is wrong with API ");
    }
  }
);
export const getAddressesAsync = createAsyncThunk(
  "user/getAddresses",
  async (_, thunkAPI) => {
    try {
      const response = await getAddresses();
      return response.data;
    } catch (error) {
      console.error("Error during getting address:", error);
      return thunkAPI.rejectWithValue("Something is wrong with API ");
    }
  }
);
export const getUserInfoAsync = createAsyncThunk(
  "user/getUserInfo",
  async (_, thunkAPI) => {
    try {
      const response = await getUserInfo();
      return response.data;
    } catch (error) {
      console.error("Error during getting user info:", error);
      return thunkAPI.rejectWithValue("Something is wrong with API ");
    }
  }
);

export const removeAddressAsync = createAsyncThunk(
  "user/removeAddress",
  async (index, thunkAPI) => {
    try {
      const response = await removeAddress(index);
      return response.data;
    } catch (error) {
      console.error("Error during getting address:", error);
      return thunkAPI.rejectWithValue("Something is wrong with API ");
    }
  }
);

export const editAddressAsync = createAsyncThunk(
  "user/editAddress",
  async ({ indexing, data }, thunkAPI) => {
    try {
      const response = await editAddress(indexing, data);

      return response.data;
    } catch (error) {
      console.error("Error during getting address:", error);
      return thunkAPI.rejectWithValue("Something is wrong with API ");
    }
  }
);

export const resetPasswordAsync = createAsyncThunk(
  "user/resetPassword",
  async (email, thunkAPI) => {
    try {
      const response = await resetPassword(email);
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error ddd", error);
      if (error.response && error.response.data) {
        return thunkAPI.rejectWithValue(error);
      } else {
        return thunkAPI.rejectWithValue("Unknown error occurred");
      }
    }
  }
);

export const setPasswordAsync = createAsyncThunk(
  "user/setPassword",
  async (userData, thunkAPI) => {
    try {
      const response = await setPassword(userData);
      return response.data;
    } catch (error) {
      console.error("Error set Password ", error);
      return thunkAPI.rejectWithValue("Something is wrong with API ");
    }
  }
);

export const setNameAsync = createAsyncThunk(
  "user/setName",
  async (name, thunkAPI) => {
    try {
      const response = await setName(name);
      return response.data;
    } catch (error) {
      console.error("Error in setting name ", error);
      return thunkAPI.rejectWithValue("Something is wrong with API ");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    AuthSignOut: (state) => {
      state.access_token = null;
      state.address = [];
      state.userInfo = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.access_token = action.payload.access_token;
        state.cartId = action.payload.cartId;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.access_token = action.payload.token;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(addAddressAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAddressAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.address = action.payload;
      })
      .addCase(addAddressAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(getAddressesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAddressesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.address = action.payload;
      })
      .addCase(getAddressesAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(getUserInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(getUserInfoAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(removeAddressAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeAddressAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.address = action.payload;
      })
      .addCase(removeAddressAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(editAddressAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editAddressAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.address = action.payload;
      })
      .addCase(editAddressAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(setPasswordAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setPasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.access_token = action.payload;
      })
      .addCase(setPasswordAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(setNameAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setNameAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(setNameAsync.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});

export const { AuthSignOut } = userSlice.actions;

export const selectUser = (state) => state.user;
export const selectError = (state) => state.user.error;
export const selectToken = (state) => state.user.access_token;
export const selectAddress = (state) => state.user.address;
export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
