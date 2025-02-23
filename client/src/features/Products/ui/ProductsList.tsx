import React from "react";
import { useProducts } from "../lib/useProducts";
import CartProduct from "@/shared/CartProduct/ui/CartProduct";
import "./ProductsList.scss";

export default function ProductsList() {
  const { products } = useProducts();
  return (
    <ul className="ProductList">
      {products.map((item) => (
        <CartProduct key={item.id} item={item} />
      ))}
    </ul>
  );
}
