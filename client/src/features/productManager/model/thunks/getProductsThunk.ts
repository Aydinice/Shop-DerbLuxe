import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNewProduct,
  deleteProduct,
  getProducts,
} from "../../api/productApi";
import { ProductActions } from "@/entities/Product/model/productSlice/productSlice";
import { ProductSchema } from "@/entities/Product/model/types/ProductSchema";
import { RootState } from "@/app/appRouters/store/store";

export const getProductThunk = createAsyncThunk(
  "product/getProducts",
  async (_, { dispatch }) => {
    try {
      const products = await getProducts();
      dispatch(ProductActions.setProducts(products));
    } catch (error) {
      console.error("Ошибка при получении товаров: ", error);
    }
  }
);

export const deleteProductThunk = createAsyncThunk(
  "product/deleteProduct",
  async (productId: number, { dispatch }) => {
    try {
      await deleteProduct(productId);
      dispatch(ProductActions.deleteProduct(productId));
    } catch (error) {}
  }
);

export const addNewProductThunk = createAsyncThunk(
  "product/addNewProduct",
  async (
    newProduct: { name: string; price: number },
    { dispatch, getState }
  ) => {
    try {
      // Отправляем запрос на сервер
      const response = await addNewProduct(newProduct);

      // Получаем текущий список товаров из состояния
      const state = getState() as RootState;
      const currentProducts = state.product.products;

      // Создаем новый массив товаров, добавляя новый товар
      const updatedProducts = [...currentProducts, response];

      // Обновляем состояние
      dispatch(ProductActions.setProducts(updatedProducts));
      dispatch(ProductActions.resetNewPost());
    } catch (error) {
      console.error("Ошибка при добавлении товара: ", error);
    }
  }
);
