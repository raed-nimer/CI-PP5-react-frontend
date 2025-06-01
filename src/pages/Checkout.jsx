import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { ShowCheckout } from "../components";
import { resetCart } from "../redux/reducer/CartSlice";
const Checkout = () => {
  const cart = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    country: "",
    state: "",
    zip: "",
    paymentMethod: "cod", // default is Cash on Delivery
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const baseUrl = import.meta.env.VITE_APP_SERVER_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();

    let subtotal = 0;
    let shipping = 30.0;

    cart.forEach((item) => {
      subtotal += parseFloat(item.product.price) * item.quantity;
    });

    const totalAmount = subtotal + shipping;

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Please login to place an order.");
        return;
      }

      const response = await fetch(`${baseUrl}/api/order/place/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          totalAmount: totalAmount.toFixed(2), // Send as string or float
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Order placed successfully!");
        dispatch(dispatch(resetCart()));
        console.log("Order ID:", data.order_id);
        navigate("/success");
      } else {
        toast.error(
          data.error || "Something went wrong while placing the order."
        );
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Server error. Please try again later.");
    }
  };

  const EmptyCart = () => (
    <div className="container">
      <div className="row">
        <div className="col-md-12 py-5 bg-light text-center">
          <h4 className="p-3 display-5">No item in Cart</h4>
          <Link to="/" className="btn btn-outline-dark mx-4">
            <i className="fa fa-arrow-left"></i> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center text-warning">Checkout</h1>
        <hr />
        {cart.length ? (
          <ShowCheckout
            cart={cart}
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        ) : (
          <EmptyCart />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
