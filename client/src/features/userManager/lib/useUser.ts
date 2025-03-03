import {
  errorSelector,
  isLoadingSelector,
  tokenSelector,
  userSelector,
} from "@/entities/User/model/selector/userSelector";
import { useDispatch, useSelector } from "react-redux";
import {
  userInfoThunk,
  userLoginThunk,
  userRegistrationThunks,
} from "../model/thunks";
import { AppDispatch } from "@/app/appRouters/store/store";

export const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(userSelector);
  const token = useSelector(tokenSelector);
  const error = useSelector(errorSelector);
  const isLoading = useSelector(isLoadingSelector);

  const registerUser = (username: string, email: string, password: string) => {
    dispatch(userRegistrationThunks({ username, email, password }));
  };

  const loginUser = (email: string, password: string) => {
    dispatch(userLoginThunk({ email, password }));
  };

  const getUserInfo = () => {
    dispatch(userInfoThunk());
  };

  return {
    user,
    token,
    error,
    isLoading,
    registerUser,
    loginUser,
    getUserInfo,
  };
};
