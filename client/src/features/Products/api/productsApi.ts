import { ProductSchema } from "@/entities/Product/model/types/ProductSchema";
import axios from "axios";

export const fetchProducts = async (): Promise<ProductSchema[]> => {
  const response = await axios.get<ProductSchema[]>(
    "http://localhost:3000/products"
  );
  return response.data;
};
