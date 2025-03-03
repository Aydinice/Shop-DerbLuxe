import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/appRouters/store/store";
import {
  addToBasketThunk,
  fetchBasketThunk,
  removeFromBasketThunk,
} from "../model/thunks";
import { useEffect } from "react";
import { basketSelector } from "@/entities/Basket/model/selector/basketSelector";

export const useBasket = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector(basketSelector);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Нужно авторизоваться");
      return;
    }

    dispatch(fetchBasketThunk());
  }, [dispatch]);

  const addToBasket = (productId: number, quantity: number) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("/login"); // Перенаправляем на страницу авторизации
      return;
    }

    dispatch(addToBasketThunk({ productId, quantity }));
  };

  const removeFromBasket = (basketItemId: number) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("/login"); // Перенаправляем на страницу авторизации
      return;
    }

    dispatch(removeFromBasketThunk(basketItemId));
  };

  return {
    items,
    addToBasket,
    removeFromBasket,
  };
};
