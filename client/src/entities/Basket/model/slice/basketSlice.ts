import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BasketSchema, BasketState } from "../types/BasketSchema";

const initialState: BasketState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasketItems: (state, action: PayloadAction<BasketSchema[]>) => {
      state.items = action.payload;
    },
    addBasketItem: (state, action: PayloadAction<BasketSchema>) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (existingItem) {
        existingItem.quantity = action.payload.quantity; // Просто устанавливаем новое значение
      } else {
        state.items.push(action.payload);
      }
    },
    removeBasketItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { actions: BasketActions } = basketSlice;
export const { reducer: BasketReducer } = basketSlice;
