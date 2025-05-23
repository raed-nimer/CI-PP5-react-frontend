import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { addCart, delCart } from "../redux/reducer/CartSlice";
import { useDispatch } from "react-redux";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchCartCount } = useCart();
  
  const dispatch = useDispatch();

  const token = localStorage.getItem("accessToken");
  const baseUrl = import.meta.env.VITE_APP_SERVER_URL;


  useEffect(() => {
  const loadGuestCart = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      guestCart.forEach(item => dispatch(addCart(item.product)));
    }
  };

  loadGuestCart();
}, []);

  // Fetch all cart items for the logged-in user
  const fetchCartItems = async () => {
    if (!token) {
      setError("You must be logged in to view your cart");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/api/cart/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Failed to fetch cart items.");
        setLoading(false);
        return;
      }

      const cartData = await response.json();

      // Ensure quantity is present (fallback to 1)
      const itemsWithQty = cartData.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      }));

      setCartItems(itemsWithQty);
      itemsWithQty.forEach((item) => dispatch(addCart(item)));
      fetchCartCount(); 
      setLoading(false);
    } catch (err) {
      console.error("Error fetching cart items:", err);
      setError("Something went wrong while fetching cart items.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  
  // Add an item or increment quantity in the cart
  const addItem = async (cartItem) => {
     console.log("Adding product:", cartItem.product); // debug
  try {
    const response = await fetch(`${baseUrl}/api/cart/add/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ product_id: cartItem.product.id }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend error:", errorData);
      throw new Error(errorData.error || "Failed to add item");
    }

    const updatedItem = await response.json();

    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === updatedItem.id);
      if (exists) {
        return prev.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        );
      } else {
        return [...prev, updatedItem];
      }
    });
     dispatch(addCart(updatedItem));
    fetchCartCount();
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
};

  // Remove or decrement quantity of an item in the cart
  const removeItem = async (cartItem) => {
    try {
      if (cartItem.quantity === 1) {
        // Delete cart item
        const response = await fetch(
          `${baseUrl}/api/cart/delete/${cartItem.id}/`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to remove item");

        setCartItems((prev) => prev.filter((item) => item.id !== cartItem.id));
         dispatch(delCart(cartItem.id)); 
        fetchCartCount();
      } else {
        // Update cart item quantity
        const response = await fetch(
          `${baseUrl}/api/cart/update/${cartItem.id}/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ quantity: cartItem.quantity - 1 }),
          }
        );

        if (!response.ok) throw new Error("Failed to update item quantity");

        const updatedItem = await response.json();

        setCartItems((prev) =>
          prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        );

         dispatch(addCart(updatedItem));
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const EmptyCart = () => (
    <div className="container text-center py-5">
      <h4 className="display-5">Your Cart is Empty</h4>
      <Link to="/" className="btn btn-outline-dark mx-4">
        <i className="fa fa-arrow-left"></i> Continue Shopping
      </Link>
    </div>
  );

  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;

    cartItems.forEach((item) => {
       console.log("img",item.product.image);
      subtotal += parseFloat(item.product.price) * item.quantity;
      totalItems += item.quantity;
    });

   
    return (
      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Item List</h5>
                </div>
                <div className="card-body">
                  {cartItems.map((item) => (
                    <div key={item.id}>
                      <div className="row d-flex align-items-center">
                        <div className="col-lg-3 col-md-12">
                          <img
                            src={`${item.product.image}`}
                            alt={item.product.name}
                            width={100}
                            height={75}
                            className="rounded"
                          />
                        </div>
                        <div className="col-lg-5 col-md-6">
                          <p>
                            <strong>{item.product.name}</strong>
                          </p>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div
                            className="d-flex mb-4"
                            style={{ maxWidth: "300px" }}
                          >
                            <button
                              className="btn px-3"
                              onClick={() => removeItem(item)}
                            >
                              <i className="fa-solid fa-minus"></i>
                            </button>

                            <p className="mx-5">{item.quantity}</p>

                            <button
                              className="btn px-3"
                              onClick={() => addItem(item)}
                            >
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          </div>

                          <p className="text-start text-md-center">
                            <strong>
                              <span className="text-muted">{item.quantity}</span> x ${item.product.price}
                            </strong>
                          </p>
                        </div>
                      </div>
                      <hr className="my-4" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header py-3 bg-light">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products ({totalItems})
                      <span>${subtotal.toFixed(2)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>${shipping.toFixed(2)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>${(subtotal + shipping).toFixed(2)}</strong>
                      </span>
                    </li>
                  </ul>

                  <Link
                    to="/checkout"
                    className="btn btn-warning btn-lg btn-block"
                  >
                    Go to checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center text-warning">Cart</h1>
        <hr />
        {loading ? (
          <h5 className="text-center">Loading...</h5>
        ) : error ? (
          <p className="text-danger text-center">{error}</p>
        ) : cartItems.length > 0 ? (
          <ShowCart />
        ) : (
          <EmptyCart />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
