import {
  errorSelector,
  isLoadingSelector,
  tokenSelector,
  userSelector,
} from "@/entities/User/model/userSelector/userSelector";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProtectedDataThunk,
  loginThunk,
  registerThunk,
} from "../model/thunks";
import { userActions } from "@/entities/User/model/userSlice/userSlice";
import { AppDispatch } from "@/app/appRouters/store/store";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>(); // Используем типизированный dispatch

  const user = useSelector(userSelector);
  const token = useSelector(tokenSelector);
  const error = useSelector(errorSelector);
  const isLoading = useSelector(isLoadingSelector);

  const handleLogin = (email: string, password: string) => {
    dispatch(loginThunk({ email, password }));
  };

  const handleRegister = (
    username: string,
    email: string,
    password: string
  ) => {
    dispatch(registerThunk({ username, email, password }));
  };

  const handlefetchProtectedData = () => {
    dispatch(fetchProtectedDataThunk());
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(userActions.logout());
  };

  return {
    user,
    token,
    error,
    isLoading,
    handleLogin,
    handleRegister,
    handlefetchProtectedData,
    logout,
  };
};
