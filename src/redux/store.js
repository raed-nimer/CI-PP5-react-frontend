import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./reducer/CartSlice"; // Import the reducer directly
import UserReducer from "./reducer/UserSlice"; // Import the user reducer if needed

const store = configureStore({
  reducer: {
    cart: CartReducer, // Could also rename to 'cart' if preferred
    user: UserReducer, // Could also rename to 'user' if preferred
  },
});

export default store;