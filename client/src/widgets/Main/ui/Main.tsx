import React from "react";
import "./Main.scss";
import axios from "axios";
import ProductsList from "@/features/Products/ui/ProductsList";
import CartProduct from "@/shared/CartProduct/ui/CartProduct";
import { LoginForm } from "@/features/isAuth/ui/LoginForm";
import { RegistrationForm } from "@/features/isAuth/ui/RegistrationForm";
import ModalForm from "@/shared/ModalForm/ui/ModalForm";

export default function Main() {
  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:3000/products/");
  };

  return (
    <main className="Main">
      <ProductsList />
    </main>
  );
}
