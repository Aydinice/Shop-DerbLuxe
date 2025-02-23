import { ProductSchema } from "@/entities/Product/model/types/ProductSchema";
import React from "react";
import "./CartProduct.scss";

interface CartProductProps {
  item: ProductSchema;
}

export default function CartProduct({ item }: CartProductProps) {
  return (
    <li className="CartProduct">
      {/* <img src="" alt="" /> */}
      <h1>{item.name}</h1>
      <h2>Цена: {item.price}р</h2>
      <p>Размер: {item.size}</p>
      <p>Цвет: {item.color}</p>
    </li>
  );
}
