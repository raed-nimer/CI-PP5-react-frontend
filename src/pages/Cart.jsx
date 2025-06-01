import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import { Link } from "react-router";
import { addCart, delCart } from "../redux/reducer/CartSlice";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken");
  const baseUrl = import.meta.env.VITE_APP_SERVER_URL;

  // Load guest cart if not logged in
  useEffect(() => {
    const loadGuestCart = () => {
      const token = localStorage.getItem("accessToken");

      if (!token && !localStorage.getItem("guestCartLoaded")) {
        const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        guestCart.forEach((item) => dispatch(addCart(item.product)));
        localStorage.setItem("guestCartLoaded", "true");
      }
    };

    loadGuestCart();
  }, []);

  const addItem = async (cartItem) => {
    try {
      if(token){
      const response = await fetch(
        `${baseUrl}/api/cart/update/${cartItem.id}/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ quantity: cartItem.quantity + 1 }),
          }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add item");
      }

      const updatedItem = await response.json();
      console.log("Updated item:", updatedItem);
      dispatch(addCart(updatedItem));
    }else{
      const guestCart = JSON.parse(localStorage.getItem("guest_cart") || "[]");

      const existingIndex = guestCart.findIndex(
        (item) => item.product.id === cartItem.product.id
      );

      if (existingIndex > -1) {
        guestCart[existingIndex].quantity += 1;
      } else {
        guestCart.push({ ...cartItem, quantity: 1 });
      }

      localStorage.setItem("guest_cart", JSON.stringify(guestCart));
       dispatch(addCart(cartItem));
    }
      // dispatch(fetchCartCount());
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const removeItem = async (cartItem) => {
    try {
      if (cartItem.quantity === 1) {
        // Delete item
        if(token){
        await fetch(`${baseUrl}/api/cart/delete/${cartItem.id}/`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
        dispatch(delCart(cartItem.id));
        // dispatch(fetchCartCount());
      } else {
        // Update quantity
        if(token){
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
      }
        dispatch(delCart(cartItem.id));
      }
    } catch (error) {
      console.error("Error removing item:", error);
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
      subtotal += parseFloat(item?.product?.price) * item.quantity;
      totalItems += item.quantity;
    });

    console.log("object", cartItems);

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
                            src={item.product?.image}
                            alt={item.product?.name}
                            width={100}
                            height={75}
                            className="rounded"
                          />
                        </div>
                        <div className="col-lg-5 col-md-6">
                          <p>
                            <strong>{item.product?.name}</strong>
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
                              {item?.quantity} x ${item.product?.price}
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
                    <li className="list-group-item d-flex justify-content-between">
                      Products ({totalItems})<span>${subtotal.toFixed(2)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      Shipping
                      <span>${shipping.toFixed(2)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Total</strong>
                      <strong>${(subtotal + shipping).toFixed(2)}</strong>
                    </li>
                  </ul>

                  <Link
                    to="/checkout"
                    className="btn btn-warning btn-lg btn-block mt-3"
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
  console.log("dvrvt", cartItems);

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center text-warning">Cart</h1>
        <hr />
        {cartItems?.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
