import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { createReduxStore } from "../store";
import { StateSchema } from "../StateSchema";

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: DeepPartial<StateSchema>;
}

const StoreProvider = (props: StoreProviderProps) => {
  const { children, initialState } = props;

  const store = createReduxStore(initialState as StateSchema);

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
