import { useEffect } from "react";
import { navigationSelector } from "./../../../entities/Navigation/model/selector/navigationSelector";
import { useDispatch, useSelector } from "react-redux";
import { fetchNavigationElements } from "../api/navigationApi";
import { fetchNavigationThunk } from "../model/thunks";

export const useNavigation = () => {
  const dispatch = useDispatch();
  const { elements } = useSelector(navigationSelector);

  useEffect(() => {
    dispatch(fetchNavigationThunk());
  }, [dispatch]);

  return { elements };
};
