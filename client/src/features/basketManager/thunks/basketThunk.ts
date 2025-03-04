import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToBasketApi,
  fetchBasketApi,
  removeFromBasketApi,
} from "../api/basketApi";
import { BasketActions } from "@/entities/Basket/model/basketSlice";

export const fetchBasketThunk = createAsyncThunk(
  "fetchBasket",
  async (_, { dispatch }) => {
    const items = await fetchBasketApi();
    dispatch(BasketActions.setBasketItems(items));
  }
);

export const addToBasketThunk = createAsyncThunk(
  "addToBasket",
  async (
    { productId, quantity }: { productId: number; quantity: number },
    { dispatch }
  ) => {
    await addToBasketApi({ productId, quantity });
    dispatch(fetchBasketThunk());
  }
);

export const removeFromBasketThunk = createAsyncThunk(
  "removeFromBasket",
  async (prodId: number, { dispatch }) => {
    await removeFromBasketApi(prodId);
    dispatch(fetchBasketThunk());
  }
);
