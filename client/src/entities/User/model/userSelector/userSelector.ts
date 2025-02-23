import { RootState } from "@/app/appRouters/store/store";

export const userSelector = (state: RootState) => state.user.user;
export const tokenSelector = (state: RootState) => state.user.token;
export const errorSelector = (state: RootState) => state.user.error;
export const isLoadingSelector = (state: RootState) => state.user.isLoading;
