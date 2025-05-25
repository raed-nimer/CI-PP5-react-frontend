import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import store from "./redux/store";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import "@fortawesome/fontawesome-free/css/all.min.css";

// import { CartProvider } from "./context/CartContext";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop>
        <AuthProvider>
          {/* <CartProvider> */}
            <Provider store={store}>
              <App />
            </Provider>
          {/* </CartProvider> */}
        </AuthProvider>
      </ScrollToTop>
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
