import React, { useEffect, useState } from "react";
import { useUser } from "../../lib/useUser";
import "./FormLogin.scss";

interface FormLoginProps {
  toggleForm: () => void;
  onCloseModal: () => void;
}

export default function FormLogin(props: FormLoginProps) {
  const { loginUser, token } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { toggleForm, onCloseModal } = props;

  useEffect(() => {
    if (token) {
      onCloseModal();
    }
  }, [token, onCloseModal]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="Введите email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Введите пароль"
      />
      <button onClick={() => loginUser(email, password)}>Отправить</button>
      <div style={{ display: "flex" }}>
        <h2 style={{ fontSize: "15px" }}>Нет аккаунта?</h2>
        <button onClick={toggleForm} style={{ marginLeft: "90px" }}>
          Зарегистрироваться
        </button>
      </div>
    </div>
  );
}
