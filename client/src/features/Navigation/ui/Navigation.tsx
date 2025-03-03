import React, { useState } from "react";
import { NavigationSchema } from "@/entities/Navigation/model/types/NavigationSchema";
import logo from "../../../app/assets/logo.png";
import basket from "../../../app/assets/basket.svg";
import autorization from "../../../app/assets/autorization.svg";
import ModalForm from "@/shared/ModalForm/ui/ModalForm";
import FormRegistration from "@/features/userManager/ui/FormRegistration/FormRegistration";
import FormLogin from "@/features/userManager/ui/FormLogin/FormLogin";
import { useDispatch, useSelector } from "react-redux";
import { UserActions } from "@/entities/User/model/userSlice/userSlice";
import { tokenSelector } from "@/entities/User/model/selector/userSelector";

interface NavigationProps {
  elements: NavigationSchema[];
}

export default function Navigation({ elements }: NavigationProps) {
  const [isModal, setIsModal] = useState(false);
  const [isLoginForm, setisIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);

  const onCloseModal = () => {
    setIsModal(false);
  };

  const showModal = () => {
    setIsModal(true);
  };

  const toggleForm = () => {
    setisIsLoginForm((prev) => !prev);
  };

  const logout = () => {
    dispatch(UserActions.logout());
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
            case "basket":
              return (
                <li className="navItem rightCont1" key={item.id}>
                  <button style={{ cursor: "pointer" }}>
                    <img className="cartImage" src={basket} alt={item.name} />
                  </button>
                </li>
              );
            case "autorization":
              return (
                <li className="navItem rightCont2" key={item.id}>
                  {token ? ( // Проверяем токен из состояния Redux
                    <button style={{ cursor: "pointer" }} onClick={logout}>
                      <img
                        className="cartImage"
                        src={autorization}
                        alt={item.name}
                      />
                      <p style={{ fontSize: "15px" }}>Выйти</p>
                    </button>
                  ) : (
                    <button style={{ cursor: "pointer" }} onClick={showModal}>
                      <img
                        className="cartImage"
                        src={autorization}
                        alt={item.name}
                      />
                      <p style={{ fontSize: "15px" }}>Войти</p>
                    </button>
                  )}
                </li>
              );
            default:
              return null;
          }
        })}
      </div>
      <ModalForm isOpen={isModal} onClose={onCloseModal}>
        {isLoginForm ? (
          <FormLogin toggleForm={toggleForm} onCloseModal={onCloseModal} />
        ) : (
          <FormRegistration
            toggleForm={toggleForm}
            onCloseModal={onCloseModal}
          />
        )}
      </ModalForm>
    </nav>
  );
}
