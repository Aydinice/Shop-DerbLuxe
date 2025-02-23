import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNavigationElements } from "../api/navigationApi";
import { NavigationActions } from "@/entities/Navigation/model/slice/NavigationSlice";

export const fetchNavigationThunk = createAsyncThunk(
  "navigation/fetchNavigation",
  async (_, { dispatch }) => {
    const elements = await fetchNavigationElements();
    dispatch(NavigationActions.setNavigationElements(elements));
  }
);
