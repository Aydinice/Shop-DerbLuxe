// entities/Basket/model/selector/basketSelector.ts
import { StateSchema } from "@/app/appRouters/store/StateSchema";

export const basketSelector = (state: StateSchema) => state.basket;
