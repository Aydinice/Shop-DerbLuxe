import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserSchema } from "../types/UserSchema";

const initialState: UserSchema = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      (state.user = null), (state.token = null), (state.error = null);
      localStorage.removeItem("token");
    },
  },
});

export const { actions: UserActions } = userSlice;
export const { reducer: UserReducer } = userSlice;
