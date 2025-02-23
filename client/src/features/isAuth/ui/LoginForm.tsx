// features/auth/ui/LoginForm/LoginForm.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../lib/useAuth";
import "./LoginForm.scss";

interface LoginFormProps {
  onClose: () => void;
  toggleForm: () => void; // Add toggleForm prop
}

export const LoginForm = (props: LoginFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { handleLogin, isLoading, error, token } = useAuth();
  const { onClose, toggleForm } = props; // Destructure toggleForm

  useEffect(() => {
    if (token) {
      onClose();
    }
  }, [token, onClose]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <form onSubmit={onSubmit}>
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
        {isLoading ? "Вход..." : "Войти"}
      </button>

      <div style={{ display: "flex" }}>
        <p style={{ marginTop: "10px" }}>Нет аккаунта?</p>
        <button onClick={toggleForm} style={{ marginLeft: "10px" }}>
          Зарегистрироваться
        </button>
      </div>
    </form>
  );
};
