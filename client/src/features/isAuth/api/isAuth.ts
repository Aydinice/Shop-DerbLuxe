import { UserSchema } from "@/entities/User/model/types/UserSchema";
// api/isAuth.ts
import axios, { AxiosError } from "axios"; // Импортируйте AxiosError

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post<{ token: string; user: UserSchema }>(
      "http://localhost:3000/auth/login",
      {
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Проверяем, является ли ошибка экземпляром AxiosError
      const axiosError = error as AxiosError; // Преобразуем error к типу AxiosError
      throw new Error(
        //@ts-ignore
        axiosError.response?.data?.error || "Произошла ошибка при входе"
      ); // Выбрасываем ошибку с более информативным сообщением
    } else {
      throw new Error("Произошла ошибка при входе");
    }
  }
};

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await axios.post<{ token: string; user: UserSchema }>(
    "http://localhost:3000/auth/register",
    {
      username,
      email,
      password,
    }
  );
  return response.data;
};

export const fetchProtectedData = async (token: string) => {
  const response = await axios.get<UserSchema>(
    "http://localhost:3000/auth/me",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
