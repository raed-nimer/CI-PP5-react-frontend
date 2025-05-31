import { use, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { Routes, Route } from "react-router";
import { fetchProducts, fetchProductsCategory, setCategory } from "./redux/reducer/ProductsSlice";
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
   const token = localStorage.getItem("accessToken");
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
          console.log("No products found in the response");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (productsState.state === "idle") {
      getProducts();
    }
  }, [dispatch]);

  useEffect(() => {
    const getCategory = async () => {
      console.log("API Call in APP to fetch Products");

      try {
        const res = await dispatch(fetchProductsCategory()).unwrap();
        console.log("Productsss fetched:", res);

        if (res) {
          console.log("Products fetched successfully:", res);
          dispatch(setCategory(res));
        } else {
          console.error("No products found in the response");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    if (productsState.category.length === 0) {
      getCategory();
    }
  },[dispatch]);

  useEffect(() => {
    const getCart = async () => {
      try {
      const response = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/cart`, {
        headers: { Authorization:` Bearer ${token} `},
      });

      if (!response.ok) throw new Error("Fetch failed");

      const cartItems = await response.json();
      const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
      // Store in localStorage
      localStorage.setItem("cart", JSON.stringify(cartItems));
      localStorage.setItem("cartCount", totalQuantity);
      dispatch(setCart({ cartItems, totalQuantity }));
      return { cartItems, totalQuantity };
    } catch (error) {
      console.error(error);
      return rejectWithValue("Error fetching cart count");
    }
  }
  if(token){
    getCart();
  }
},[token]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product" element={<Products />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/my-orders" element={<MyOrders/>} />
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
