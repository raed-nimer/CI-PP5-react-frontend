import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { resetCart } from "../redux/reducer/CartSlice";
const Checkout = () => {
  const cart = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

  const cartItems = location.state?.cartItems || [];
  console.log("hh",cartItems)

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
      navigate('/success');
    } else {
      toast.error(data.error || "Something went wrong while placing the order.");
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

  const ShowCheckout = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
   cart.forEach((item) => {
     
      subtotal += parseFloat(item.product.price) * item.quantity;
      totalItems += item.quantity;
    });



    return (
      <div className="container py-5">
        <div className="row my-4">
          <div className="col-md-5 col-lg-4 order-md-last">
            <div className="card mb-4">
              <div className="card-header py-3 bg-light">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products ({totalItems})<span>${Math.round(subtotal)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping<span>${shipping}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <strong>Total amount</strong>
                    <strong>${Math.round(subtotal + shipping)}</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-7 col-lg-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h4 className="mb-0">Billing Address</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-sm-6 my-1">
                      <label className="form-label">First name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-sm-6 my-1">
                      <label className="form-label">Last name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-12 my-1">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-12 my-1">
                      <label className="form-label">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>

                   

                    <div className="col-md-5 my-1">
                      <label className="form-label">Country</label>
                      <select
                        className="form-select"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Choose...</option>
                        <option value="India">India</option>
                      </select>
                    </div>

                    <div className="col-md-4 my-1">
                      <label className="form-label">State</label>
                      <select
                        className="form-select"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Choose...</option>
                        <option value="Punjab">Punjab</option>
                      </select>
                    </div>

                    <div className="col-md-3 my-1">
                      <label className="form-label">Zip</label>
                      <input
                        type="text"
                        className="form-control"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <hr className="my-4" />

                  <h4 className="mb-3">Payment Method</h4>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleChange}
                      id="cod"
                    />
                    <label className="form-check-label" htmlFor="cod">
                      Cash on Delivery
                    </label>
                  </div>

                  <hr className="my-4" />

                  <button
                    className="w-100 btn btn-primary"
                    type="submit"
                    disabled={cart.length === 0}
                  >
                    Place Order
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center text-warning">Checkout</h1>
        <hr />
        {cart.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
