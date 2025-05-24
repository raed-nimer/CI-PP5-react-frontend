import { createSlice } from "@reduxjs/toolkit";

// Retrieve initial state from localStorage
const getInitialCart = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const CartSlice = createSlice({
  name: "cart",
  initialState: getInitialCart(),
  reducers: {
    addCart: (state, action) => {
      const product = action.payload;
      const exist = state.find((x) => x.id === product.id);
      if (exist) {
        exist.qty += 1;
      } else {
        state.push({ ...product, qty: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
   delCart: (state, action) => {
  const product = action.payload;
  const exist = state.find((x) => x.id === product.id);
  let updatedCart;

  if (exist.qty === 1) {
    updatedCart = state.filter((x) => x.id !== exist.id);
  } else {
    updatedCart = state.map((x) =>
      x.id === product.id ? { ...x, qty: x.qty - 1 } : x
    );
  }

  localStorage.setItem("cart", JSON.stringify(updatedCart));
  return updatedCart;
}

  },
});

export const { addCart, delCart } = CartSlice.actions;
export default CartSlice.reducer;
