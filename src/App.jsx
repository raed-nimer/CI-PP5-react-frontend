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
  MyOrders
} from "./pages";

import { PrivateRoute } from "./components";
import { useEffect } from "react";
import { fetchCart, setCart } from "./redux/reducer/CartSlice";

function App() {
  const productsState = useSelector((state) => state.products);
  const cartState = useSelector((state) => state.cart);
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

    const getCartItem = async () => {
      console.log("API Call in APP to fetch Products");

      try {
        const res = await dispatch(fetchCart()).unwrap();
        console.log("cart fetched:", res);

        if (!res.ok) throw new Error("Failed to fetch cart");

        const cartItems = await res.json();
        const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

        dispatch(setCart({ cartItems, totalQuantity }));
        console.log("Cart fetched:", cartItems);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    if (productsState.state === "idle") {
      getProducts();
      getCartItem();
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
      <Route path="/my-orders" element={<MyOrdersPage/>} />
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
