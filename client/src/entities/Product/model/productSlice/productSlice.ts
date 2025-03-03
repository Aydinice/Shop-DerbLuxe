import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductSchema } from "../types/ProductSchema";

export interface ProductState {
  products: ProductSchema[];
  newProduct: {
    name: string;
    price: number;
  };
  searchQuery: string;
}

const initialState: ProductState = {
  products: [],
  newProduct: {
    name: "",
    price: 0,
  },
  searchQuery: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductSchema[]>) => {
      state.products = action.payload;
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    setNewProductName: (state, action: PayloadAction<string>) => {
      state.newProduct.name = action.payload;
    },
    setNewProductPrice: (state, action: PayloadAction<number>) => {
      state.newProduct.price = action.payload;
    },
    resetNewPost: (state) => {
      state.newProduct.name = "";
      state.newProduct.price = 0;
    },
    sortedProducts: (state, action: PayloadAction<string>) => {
      if (action.payload === "name") {
        state.products = [...state.products].sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      } else if (action.payload === "price") {
        state.products = [...state.products].sort((a, b) => {
          return a.price - b.price;
        });
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { actions: ProductActions } = productSlice;
export const { reducer: ProductReducer } = productSlice;
