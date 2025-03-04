import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BasketSchema, BasketState } from "../types/BasketSchema";

const initialState: BasketState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basketSlice",
  initialState,
  reducers: {
    setBasketItems: (state, actions: PayloadAction<BasketSchema[]>) => {
      state.items = actions.payload;
    },
    addProductToBasket: (state, action: PayloadAction<BasketSchema>) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeProductBasket: (state, action: PayloadAction<number>) => {
      state.items = [...state.items].filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { actions: BasketActions } = basketSlice;
export const { reducer: BasketReducer } = basketSlice;
