import { User } from "@/entities/User/model/types/UserSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { userInfoApi, userLoginApi, userRegistrationApi } from "../api/userApi";
import { UserActions } from "@/entities/User/model/userSlice/userSlice";

// В thunks для логина и регистрации
export const userLoginThunk = createAsyncThunk(
  "userLogin",
  async (
    { email, password }: { email: string; password: string },
    { dispatch }
  ) => {
    try {
      const { token, user } = await userLoginApi({ email, password });
      localStorage.setItem("token", token); // Сохраняем токен
      localStorage.setItem("user", JSON.stringify(user)); // Сохраняем данные пользователя
      dispatch(UserActions.setToken(token));
      dispatch(UserActions.setUser(user));
    } catch (error) {
      console.error("Ошибка при логинизации: ", error);
    }
  }
);

export const userRegistrationThunks = createAsyncThunk(
  "userRegistration",
  async (
    {
      username,
      email,
      password,
    }: { username: string; email: string; password: string },
    { dispatch }
  ) => {
    try {
      const { token, user } = await userRegistrationApi({
        username,
        email,
        password,
      });
      localStorage.setItem("token", token); // Сохраняем токен
      localStorage.setItem("user", JSON.stringify(user)); // Сохраняем данные пользователя
      dispatch(UserActions.setToken(token));
      dispatch(UserActions.setUser(user));
    } catch (error) {
      console.error("Ошибка при регистрации: ", error);
    }
  }
);

export const userInfoThunk = createAsyncThunk(
  "userInfo",
  async (_, { dispatch }) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const user = await userInfoApi(token);
      dispatch(UserActions.setUser(user));
    } catch (error) {}
  }
);
