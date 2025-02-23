import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../api/productsApi";
import { ProductActions } from "@/entities/Product/model/productSlice/productSlice";

export const fetchProductThunks = createAsyncThunk(
  "products/fetchProducts",
  async (_, { dispatch }) => {
    const products = await fetchProducts();
    dispatch(ProductActions.setProducts(products));
  }
);
