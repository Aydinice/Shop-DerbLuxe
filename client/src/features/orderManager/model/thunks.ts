// entities/Order/thunks/orderThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrdersApi, createOrderApi } from "../api/orderApi";
import { Order } from "@/entities/Order/model/types/OrderSchema"; // Импортируйте Order

export const fetchOrdersThunk = createAsyncThunk<
  Order[], // Явно указываем, что thunk возвращает массив Order
  void, // Thunk не принимает аргументов
  { rejectValue: string } // Для обработки ошибок
>("fetchOrders", async (_, thunkApi) => {
  try {
    const orders = await fetchOrdersApi();
    //dispatch(OrderActions.setOrders(orders)); // Убираем dispatch, возвращаем результат
    return orders as Order[]; // Возвращаем результат
  } catch (error: any) {
    return thunkApi.rejectWithValue(
      error.message || "Не удалось загрузить заказы"
    );
  }
});

export const createOrderThunk = createAsyncThunk<
  Order,
  {
    items: { productId: number; quantity: number }[];
    shippingAddress: string;
    paymentMethod: string;
  },
  { rejectValue: string }
>("order/createOrder", async (orderData, { rejectWithValue }) => {
  try {
    const order = await createOrderApi(orderData);
    return order;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(error.response.data.error || "Ошибка сервера");
    }
    return rejectWithValue("Не удалось подключиться к серверу");
  }
});
