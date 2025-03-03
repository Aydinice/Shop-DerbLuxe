import { RootState } from "@/app/appRouters/store/store";

export const searchQuerySelector = (state: RootState) =>
  state.product.searchQuery;
