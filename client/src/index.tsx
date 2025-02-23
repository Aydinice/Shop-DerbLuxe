import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import StoreProvider from "./app/appRouters/store/ui/storeProvider";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);
root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
