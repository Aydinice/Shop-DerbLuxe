import { NavigationState } from "./../../../entities/Navigation/model/slice/NavigationSlice";
import {
  Action,
  configureStore,
  ReducersMapObject,
  ThunkAction,
} from "@reduxjs/toolkit";
import { StateSchema } from "./StateSchema";
import { Provider } from "react-redux";
import { NavigationReducer } from "@/entities/Navigation/model/slice/NavigationSlice";
import { ProductReducer } from "@/entities/Product/model/productSlice/productSlice";
import { userReducer } from "@/entities/User/model/userSlice/userSlice";

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    navigation: NavigationReducer,
    product: ProductReducer,
    user: userReducer,
  };

  const store = configureStore({
    reducer: rootReducers,
    preloadedState: initialState,
  });

  // @ts-ignore

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
export type RootState = ReturnType<
  ReturnType<typeof createReduxStore>["getState"]
>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
