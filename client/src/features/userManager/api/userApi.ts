import { User } from "@/entities/User/model/types/UserSchema";
import axios from "axios";

export const userRegistrationApi = async (newUser: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(
    `http://localhost:3000/auth/register`,
    newUser
  );
  return response.data;
};

export const userLoginApi = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axios.post<{ token: string; user: User }>(
    `http://localhost:3000/auth/login`,
    {
      email,
      password,
    }
  );
  return response.data;
};

export const userInfoApi = async (token: string) => {
  const response = await axios.get<User>(`http://localhost:3000/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
