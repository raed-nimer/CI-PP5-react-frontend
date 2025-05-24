import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  products: [],
  loading: false,
  state: "idle",
};

// Write async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_SERVER_URL}/api/products/`
    );
    return response.data;
  }
);

const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.state = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.state = "fulfilled";
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.state = "rejected";
      });
  },
});

export const {} = ProductsSlice.actions;

export default ProductsSlice.reducer;
