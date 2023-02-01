import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./utils/i18n";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { GlobalProvider } from "./context/GlobalContext";
import { ItemsProvider } from "./context/ItemsContext";
import { OrderProvider } from "./context/OrdersContext";
import { InfoProvider } from "./context/InfoContext";
import { FavouritesProvider } from "./context/FavouritesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <OrderProvider>
        <ItemsProvider>
          <GlobalProvider>
            <InfoProvider>
              <FavouritesProvider>
                <App />
              </FavouritesProvider>
            </InfoProvider>
          </GlobalProvider>
        </ItemsProvider>
      </OrderProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
