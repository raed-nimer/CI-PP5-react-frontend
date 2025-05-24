import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { Routes, Route } from "react-router";
import { fetchProducts } from "./redux/reducer/ProductsSlice";
import {
  Home,
  Product,
  Products,
  AboutPage,
  ContactPage,
  Cart,
  Login,
  Register,
  Checkout,
  PageNotFound,
  Profile,
  OrderPlace,
} from "./pages";

import { PrivateRoute } from "./components";
import { useEffect } from "react";

function App() {
  const productsState = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      console.log("API Call in APP to fetch Products");

      try {
        const res = await dispatch(fetchProducts()).unwrap();
        console.log("Productsss fetched:", res);

        if (res && res.products) {
          console.log("Products fetched successfully:", res.products);
        } else {
          console.error("No products found in the response");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (productsState.state === "idle") {
      getProducts();
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product" element={<Products />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/checkout"
        element={
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        }
      />

      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/product/*" element={<PageNotFound />} />
      <Route path="/success" element={<OrderPlace />} />
    </Routes>
  );
}

export default App;
