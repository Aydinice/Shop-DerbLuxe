import React, { useEffect, useState } from "react";
import "./FormRegistration.scss";
import { useUser } from "../../lib/useUser";

interface FormRegistrationProps {
  toggleForm: () => void;
  onCloseModal: () => void;
}

export default function FormRegistration(props: FormRegistrationProps) {
  const { toggleForm, onCloseModal } = props;
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { registerUser, token } = useUser();

  useEffect(() => {
    if (token) {
      onCloseModal();
    }
  }, [token, onCloseModal]);

  return (
    <div className="FormRegistration">
      <input
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        type="text"
        placeholder="Введите имя пользователя"
      />
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="Введите почту"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Введите пароль"
      />
      <button onClick={() => registerUser(username, email, password)}>
        Зарегистрироваться
      </button>
      <div style={{ display: "flex" }}>
        <h2 style={{ fontSize: "15px" }}>Уже есть аккаунт?</h2>
        <button onClick={toggleForm} style={{ marginLeft: "90px" }}>
          Войти
        </button>
      </div>
    </div>
  );
}
