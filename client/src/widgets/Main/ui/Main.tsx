import React from "react";
import "./Main.scss";
import ProductsList from "@/features/productManager/ui/ProductList/ProductList";
import FormUserInfo from "@/features/userManager/ui/FormUserInfo/FormUserInfo";
import BasketList from "@/features/basketManager/ui/BasketList/BasketList";
import { OrderList } from "@/features/orderManager/ui/OrderList";

export default function Main() {
  return (
    <main className="Main">
      <ProductsList />
      <FormUserInfo />
      <BasketList />
      <OrderList />
    </main>
  );
}
