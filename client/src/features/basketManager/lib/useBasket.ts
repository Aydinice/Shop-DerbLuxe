import { basketSelector } from "@/entities/Basket/selector/basketSelector";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasketThunk,
  fetchBasketThunk,
  removeFromBasketThunk,
} from "../thunks/basketThunk";
import { AppDispatch } from "@/app/appRouters/store/store";

export const useBasket = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector(basketSelector);

  useEffect(() => {
    dispatch(fetchBasketThunk());
  }, [dispatch]);

  const addToBasketProduct = (productId: number, quantity: number) => {
    dispatch(addToBasketThunk({ productId, quantity }));
  };

  const removeFromBasket = (prodId: number) => {
    dispatch(removeFromBasketThunk(prodId));
  };

  return { items, addToBasketProduct, removeFromBasket };
};
