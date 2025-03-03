import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BasketActions } from "@/entities/Basket/model/slice/basketSlice";
import { AppDispatch } from "@/app/appRouters/store/store";

// features/basketManager/model/thunks.ts
export const addToBasketThunk = createAsyncThunk(
  "basket/addToBasket",
  async (
    { productId, quantity }: { productId: number; quantity: number },
    { dispatch }
  ) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Токен отсутствует");
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/basket/add",
        {
          productId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Обновляем состояние корзины
      dispatch(BasketActions.addBasketItem(response.data));
    } catch (error) {
      console.error("Ошибка при добавлении товара в корзину:", error);
      throw error;
    }
  }
);

export const fetchBasketThunk = createAsyncThunk(
  "basket/fetchBasket",
  async (_, { dispatch }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Токен отсутствует");
    }

    try {
      const response = await axios.get("http://localhost:3000/api/basket", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(BasketActions.setBasketItems(response.data));
    } catch (error) {
      console.error("Ошибка при получении корзины:", error);
    }
  }
);

export const removeFromBasketThunk = createAsyncThunk(
  "basket/removeFromBasket",
  async (basketItemId: number, { dispatch }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Токен отсутствует");
    }

    try {
      await axios.delete(`http://localhost:3000/api/basket/${basketItemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(BasketActions.removeBasketItem(basketItemId));
    } catch (error) {
      console.error("Ошибка при удалении товара из корзины:", error);
    }
  }
);
