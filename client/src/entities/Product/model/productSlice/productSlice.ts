import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductSchema } from "../types/ProductSchema";

export interface ProductState {
  products: ProductSchema[];
}

const initialState: ProductState = {
  products: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductSchema[]>) => {
      state.products = action.payload;
    },
  },
});

export const { actions: ProductActions } = productSlice;
export const { reducer: ProductReducer } = productSlice;
