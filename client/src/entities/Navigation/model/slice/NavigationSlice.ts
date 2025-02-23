import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavigationSchema } from "../types/NavigationSchema";

export interface NavigationState {
  elements: NavigationSchema[];
}

const initialState: NavigationState = {
  elements: [],
};

export const NavigationSlice = createSlice({
  name: "Navigation",
  initialState,
  reducers: {
    setNavigationElements: (
      state,
      action: PayloadAction<NavigationSchema[]>
    ) => {
      state.elements = action.payload;
    },
  },
});

export const { actions: NavigationActions } = NavigationSlice;
export const { reducer: NavigationReducer } = NavigationSlice;
