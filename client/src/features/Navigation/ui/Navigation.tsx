import React, { useState } from "react";
import { NavigationSchema } from "@/entities/Navigation/model/types/NavigationSchema";
import logo from "../../../app/assets/logo.png";
import autorization from "../../../app/assets/autorization.svg";
import basket from "../../../app/assets/basket.svg";
import ModalForm from "@/shared/ModalForm/ui/ModalForm";
import { LoginForm } from "@/features/isAuth/ui/LoginForm";
import { RegistrationForm } from "@/features/isAuth/ui/RegistrationForm";

interface NavigationProps {
  elements: NavigationSchema[];
}

export default function Navigation({ elements }: NavigationProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true); // Initial state: show LoginForm

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm); // Toggle between LoginForm and RegistrationForm
  };

  return (
    <nav className="Navbar">
      <div className="container">
        {elements.map((item) => {
          switch (item.type) {
            case "category":
              const categoryId = (item.data as any)?.category_id;
              return (
                <li className="navItem" key={item.id}>
                  <a href={`/category/${categoryId}`}>{item.name}</a>
                </li>
              );
            case "promo":
              const promoId = (item.data as any)?.promo_id;
              return (
                <li className="navItem" key={item.id}>
                  <a href={`/promo/${promoId}`}>{item.name}</a>
                </li>
              );
            case "custom_link":
              return (
                <li className="navItem" key={item.id}>
                  <a href={item.slug}>{item.name}</a>
                </li>
              );
            case "logo":
              return (
                <li className="navItem" key={item.id}>
                  <a href={item.slug} aria-label="Логотип">
                    <img className="image" src={logo} alt={item.name} />
                  </a>
                </li>
              );
            case "cart":
              return (
                <li className="navItem rightCont1" key={item.id}>
                  <a href="#" aria-label="Корзина">
                    <img className="cartImage" src={basket} alt={item.name} />
                  </a>
                </li>
              );
            case "autorization":
              return (
                <li className="navItem rightCont2" key={item.id}>
                  <button onClick={openAuthModal} aria-label="Авторизация">
                    <img
                      className="cartImage"
                      src={autorization}
                      alt={item.name}
                    />
                  </button>
                </li>
              );
            default:
              return null;
          }
        })}
      </div>
      <ModalForm isOpen={isAuthModalOpen} onClose={closeAuthModal}>
        {isLoginForm ? (
          <LoginForm
            onClose={closeAuthModal}
            toggleForm={toggleForm} // Pass toggleForm function
          />
        ) : (
          <RegistrationForm
            onClose={closeAuthModal}
            toggleForm={toggleForm} // Pass toggleForm function
          />
        )}
      </ModalForm>
    </nav>
  );
}
