import { RootState } from "@/app/appRouters/store/store";

export const newProductSelector = (state: RootState) =>
  state.product.newProduct;
