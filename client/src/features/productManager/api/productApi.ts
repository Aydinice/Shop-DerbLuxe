import { ProductSchema } from "@/entities/Product/model/types/ProductSchema";
import axios from "axios";

export const getProducts = async () => {
  const response = await axios.get("http://localhost:3000/products");
  return response.data;
};

export const deleteProduct = async (productId: number) => {
  const response = await axios.delete(
    `http://localhost:3000/products/${productId}`
  );
  return response.data;
};

export const addNewProduct = async (newProduct: ProductSchema) => {
  const response = await axios.post(
    "http://localhost:3000/products",
    newProduct
  );
  return response.data;
};
