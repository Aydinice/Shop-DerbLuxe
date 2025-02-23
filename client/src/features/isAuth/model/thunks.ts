import { userActions } from "@/entities/User/model/userSlice/userSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProtectedData, login, register } from "../api/isAuth";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(userActions.setIsLoading(true));
      const { token, user } = await login(email, password);
      localStorage.setItem("token", token);
      // sessionStorage.setItem("token", token);
      dispatch(userActions.setToken(token));
      dispatch(userActions.setUser(user));
      dispatch(userActions.setError(null));
      return { token, user }; // Важно вернуть данные
    } catch (error: any) {
      // Обязательно указать тип any для error
      dispatch(userActions.setError(error.message || "Ошибка при входе"));
      return rejectWithValue(error.message || "Ошибка при входе"); // Используем rejectWithValue для передачи ошибки в rejected стейт
    } finally {
      dispatch(userActions.setIsLoading(false));
    }
  }
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (
    {
      username,
      email,
      password,
    }: { username: string; email: string; password: string },
    { dispatch }
  ) => {
    try {
      dispatch(userActions.setIsLoading(true));
      const { token, user } = await register(username, email, password);
      localStorage.setItem("token", token);
      // sessionStorage.setItem("token", token);
      dispatch(userActions.setToken(token));
      dispatch(userActions.setUser(user));
      dispatch(userActions.setError(null));
    } catch (error) {
      dispatch(userActions.setError("Ошибка при регистрации"));
    } finally {
      dispatch(userActions.setIsLoading(false));
    }
  }
);

export const fetchProtectedDataThunk = createAsyncThunk(
  "auth/fetchProtectedData",
  async (_, { dispatch }) => {
    const token = localStorage.getItem("token");
    // const token = sessionStorage.getItem("token");

    if (!token) return;

    try {
      dispatch(userActions.setIsLoading(true));
      const user = await fetchProtectedData(token);
      dispatch(userActions.setUser(user));
      dispatch(userActions.setError(null));
    } catch (error) {
      dispatch(
        userActions.setError("Ошибка при получении данных пользователя")
      );
    } finally {
      dispatch(userActions.setIsLoading(false));
    }
  }
);
