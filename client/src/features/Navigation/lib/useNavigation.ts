import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNavigationElements } from "../api/navigationApi";
import { fetchNavigationThunk } from "../model/thunks";
import { AppDispatch } from "@/app/appRouters/store/store";
import { navigationSelector } from "@/entities/Navigation/model/selector/navigationSelector";

export const useNavigation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { elements } = useSelector(navigationSelector);

  useEffect(() => {
    dispatch(fetchNavigationThunk());
  }, [dispatch]);

  return { elements };
};
