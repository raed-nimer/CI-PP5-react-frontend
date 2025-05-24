import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./reducer/CartSlice"; 
import UserReducer from "./reducer/UserSlice"; 
import ProductsReducer from "./reducer/ProductsSlice";

const store = configureStore({
  reducer: {
    cart: CartReducer,
    user: UserReducer,
    products: ProductsReducer,
  },
});

export default store;
