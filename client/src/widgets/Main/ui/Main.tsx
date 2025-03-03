import React, { useEffect } from "react";
import "./Main.scss";
import axios from "axios";
import CartProduct from "@/shared/CartProduct/ui/CartProduct";
import ModalForm from "@/shared/ModalForm/ui/ModalForm";
import { getProductThunk } from "@/features/productManager/model/thunks/getProductsThunk";
import ProductsList from "@/features/productManager/ui/ProductList/ProductList";
import FormUserInfo from "@/features/userManager/ui/FormUserInfo/FormUserInfo";
import { BasketList } from "@/features/basketManager/ui/BasketList/BasketList";

export default function Main() {
  return (
    <main className="Main">
      <ProductsList />
      <FormUserInfo />
      <BasketList />
    </main>
  );
}
