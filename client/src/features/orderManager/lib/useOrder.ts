// entities/Order/lib/useOrder.ts
import { AppDispatch, RootState } from "@/app/appRouters/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrderThunk, fetchOrdersThunk } from "../model/thunks";

export const useOrder = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, isLoading, error } = useSelector(
    (state: RootState) => state.order
  );

  useEffect(() => {
    dispatch(fetchOrdersThunk());
  }, [dispatch]);

  const createOrder = async (orderData: {
    items: { productId: number; quantity: number }[];
    shippingAddress: string;
    paymentMethod: string;
  }) => {
    try {
      const resultAction = await dispatch(createOrderThunk(orderData)).unwrap();
      return { success: true, data: resultAction };
    } catch (error) {
      return { success: false, error };
    }
  };

  return { orders, isLoading, error, createOrder };
};
