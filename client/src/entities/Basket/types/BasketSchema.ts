import { ProductSchema } from "@/entities/Product/model/types/ProductSchema";

export interface BasketSchema {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  product: ProductSchema;
}

export interface BasketState {
  items: BasketSchema[];
}
