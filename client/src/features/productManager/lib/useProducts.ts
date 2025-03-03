import { ProductActions } from "@/entities/Product/model/productSlice/productSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProductThunk,
  deleteProductThunk,
  getProductThunk,
} from "../model/thunks/getProductsThunk";
import { productSelector } from "@/entities/Product/model/selector/productSelector";
import { AppDispatch, RootState } from "@/app/appRouters/store/store";
import { newProductSelector } from "@/entities/Product/model/selector/newProductSelector";
import { searchQuerySelector } from "@/entities/Product/model/selector/searchQuerySelector";

export const useProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) =>
    productSelector(state)
  );
  const { name, price } = useSelector(newProductSelector);
  const searchQuery = useSelector(searchQuerySelector);

  useEffect(() => {
    dispatch(getProductThunk());
  }, [dispatch]);

  const delProduct = (productId: number) => {
    dispatch(deleteProductThunk(productId));
  };

  const onChangeNewProductName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(ProductActions.setNewProductName(e.target.value));
  };

  const onChangeNewProductPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = Number(e.target.value);
    dispatch(ProductActions.setNewProductPrice(price));
  };

  const addNewProduct = () => {
    dispatch(addNewProductThunk({ name, price }));
  };

  const sortedProducts = (type: string) => {
    dispatch(ProductActions.sortedProducts(type));
  };

  const onChangeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(ProductActions.setSearchQuery(e.target.value));
  };

  const filteredSearchQuery = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    products,
    delProduct,
    name,
    price,
    onChangeNewProductName,
    onChangeNewProductPrice,
    addNewProduct,
    sortedProducts,
    searchQuery,
    onChangeSearchQuery,
    filteredSearchQuery,
  };
};
