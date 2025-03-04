import { BasketState } from "@/entities/Basket/types/BasketSchema";
import { NavigationState } from "@/entities/Navigation/model/slice/NavigationSlice";
import { OrderSchema } from "@/entities/Order/model/types/OrderSchema";
import { ProductState } from "@/entities/Product/model/productSlice/productSlice";
import { UserSchema } from "@/entities/User/model/types/UserSchema";

export interface StateSchema {
  navigation: NavigationState;
  product: ProductState;
  user: UserSchema;
  basket: BasketState;
  order: OrderSchema;
}
