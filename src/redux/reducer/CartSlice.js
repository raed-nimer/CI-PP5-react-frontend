import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch cart count from server
export const fetchCart = createAsyncThunk(
  "cart/fetchCartCount",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      return rejectWithValue("User not logged in");
    }

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

      return { cartItems, totalQuantity };
    } catch (error) {
      console.error(error);
      return rejectWithValue("Error fetching cart count");
    }
  }
);


// Get cart from localStorage
const getInitialCart = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const initialState = {
  items: getInitialCart(),
  cartCount: parseInt(localStorage.getItem("cartCount") || "0"),
  isLoading: false,
  isFetched: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
     setCart: (state, action) => {
      const { cartItems, totalQuantity } = action.payload;
      state.items = cartItems;
      state.cartCount = totalQuantity;
      state.isFetched = true;
      localStorage.setItem("cart", JSON.stringify(cartItems));
      localStorage.setItem("cartCount", totalQuantity);
    },
    addCart: (state, action) => {
      const product = action.payload;
      const cartItemId = product.id;
      const exist = state.items.find((x) => x.id === product.id);

      if (exist) {
        exist.quantity += 1;
      } else {
         state.items.push({
          id: cartItemId,
          product: product,
          quantity: 1,
        });
      }

      state.cartCount += 1;
      console.log('state',state.items);
      localStorage.setItem("cart", JSON.stringify(state.items));
      localStorage.setItem("cartCount", state.cartCount);
    },
    delCart: (state, action) => {
    const productId = action.payload;
    const exist = state.items.find((x) => x.id === productId);

    if (!exist) return;

    if (exist.quantity === 1) {
      state.items = state.items.filter((x) => x.id !== productId);
    } else {
      exist.quantity -= 1;
    }

    state.cartCount = Math.max(0, state.cartCount - 1);
    localStorage.setItem("cart", JSON.stringify(state.items));
    localStorage.setItem("cartCount", state.cartCount);
    },
    resetCart: (state) => {
      state.items = [];
      state.cartCount = 0;
      localStorage.removeItem("cart");
      localStorage.setItem("cartCount", "0");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchCart.fulfilled, (state, action) => {
      state.items = action.payload.cartItems;
      state.cartCount = action.payload.totalQuantity;
      state.isLoading = false;
      state.isFetched = true;  // Mark as fetched so UI can skip refetch
    })
    .addCase(fetchCart.rejected, (state) => {
      state.isLoading = false;
      state.isFetched = false; // or true? depends on your error handling
    });
  },
});

export const {setCart, addCart, delCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
