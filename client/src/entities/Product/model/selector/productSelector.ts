import { StateSchema } from "@/app/appRouters/store/StateSchema";

export const productSelector = (state: StateSchema) => state.product;
