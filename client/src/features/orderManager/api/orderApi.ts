// entities/Order/api/orderApi.ts
import axios from "axios";

export const fetchOrdersApi = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Токен отсутствует");
  }

  const response = await axios.get(`http://localhost:3000/api/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createOrderApi = async (orderData: {
  items: { productId: number; quantity: number }[];
  shippingAddress: string;
  paymentMethod: string;
}) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Токен отсутствует");
  }

  const response = await axios.post(
    `http://localhost:3000/api/orders`,
    orderData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const clearBasketApi = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Токен отсутствует");
  }

  await axios.delete(`http://localhost:3000/api/basket/clear`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const cancelOrderApi = async (orderId: number) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Токен отсутствует");
  }

  const response = await axios.patch(
    `http://localhost:3000/api/orders/${orderId}/cancel`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const deleteOrderApi = async (orderId: number) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Токен отсутствует");
  }

  const response = await axios.delete(
    `http://localhost:3000/api/orders/${orderId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
