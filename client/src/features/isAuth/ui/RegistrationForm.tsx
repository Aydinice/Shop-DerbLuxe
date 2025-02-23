// features/auth/ui/RegistrationForm/RegistrationForm.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../lib/useAuth";

interface RegistrationFormProps {
  onClose: () => void;
  toggleForm: () => void; // Add toggleForm prop
}

export const RegistrationForm = (props: RegistrationFormProps) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { handleRegister, isLoading, error, token } = useAuth();
  const { onClose, toggleForm } = props; // Destructure toggleForm

  useEffect(() => {
    if (token) {
      onClose();
    }
  }, [token, onClose]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRegister(username, email, password);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Имя пользователя:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Пароль:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Регистрация..." : "Зарегистрироваться"}
      </button>
      <div style={{ display: "flex" }}>
        <p style={{ marginTop: "10px" }}>Уже есть аккаунт?</p>
        <button onClick={toggleForm} style={{ marginLeft: "10px" }}>
          Войти
        </button>
      </div>
    </form>
  );
};
