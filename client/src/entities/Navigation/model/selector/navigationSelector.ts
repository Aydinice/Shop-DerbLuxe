import { StateSchema } from "@/app/appRouters/store/StateSchema";

export const navigationSelector = (state: StateSchema) => state.navigation;
