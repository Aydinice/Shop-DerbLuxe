import { productSelector } from "@/entities/Product/model/selector/productSelector";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductThunks } from "../model/thunks";

export const useProducts = () => {
  const { products } = useSelector(productSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductThunks());
  }, [dispatch]);

  return { products };
};
