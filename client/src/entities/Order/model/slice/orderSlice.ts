import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchOrdersThunk,
  createOrderThunk,
} from "@/features/orderManager/model/thunks"; // Важно импортировать createOrderThunk
import { OrderSchema, Order } from "../types/OrderSchema"; // Импортируем Order

const initialState: OrderSchema = {
  orders: [],
  isLoading: false,
  error: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      // Обновлено: принимает Order[]
      state.orders = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Обработка createOrderThunk
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = [...state.orders, action.payload];
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload || "Неизвестная ошибка при создании заказа";
      })
      // Обработка fetchOrdersThunk
      .addCase(fetchOrdersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrdersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || "Произошла ошибка при загрузке заказов";
      });
  },
});

export const { actions: OrderActions } = orderSlice;
export const { reducer: OrderReducer } = orderSlice;
