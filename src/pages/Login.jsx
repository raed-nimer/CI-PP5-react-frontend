import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Footer, Navbar } from "../components";
import axios from "axios";
import { loginUser } from "../redux/reducer/UserSlice";
import { useDispatch } from "react-redux";
import { useAuth } from "../context/AuthContext";
import "../App.css";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Merge Guest Cart Function
  const mergeGuestCart = async (token) => {
    const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
    if (!token || guestCart.length === 0) return;

    for (const item of guestCart) {
      try {
        await axios.post(
          `${import.meta.env.VITE_APP_SERVER_URL}/api/cart/add/`,
          {
            product_id: item.product.id,
            quantity: item.quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        console.error("Error merging guest cart item:", err);
      }
    }

    // Clear guest cart after merging
    localStorage.removeItem("guestCart");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data:", loginData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/accounts/login`,
        loginData
      );

      if (response.data.status === "success") {
        const accessToken = response.data.access;
        const refreshToken = response.data.refresh;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        console.log("Login successful:", response.data);

        dispatch(
          loginUser({
            user: response.data.user,
            token: accessToken,
          })
        );
        login(response.data.user, accessToken);

        // Merge guest cart into logged-in cart
        await mergeGuestCart(accessToken);

        toast.success("Login successful!");
        navigate("/"); // Redirect to homepage
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
    }

    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Navbar />
      <div className="container my-5 py-4 min-vh-75">
        <h1 className="text-center text-warning mb-4">Login</h1>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow rounded-4 p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    value={loginData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <p>
                    New here?{" "}
                    <Link
                      to="/register"
                      className="text-decoration-underline text-info"
                    >
                      Register
                    </Link>
                  </p>
                </div>
                <div className="text-center">
                  <button className="btn btn-warning px-4" type="submit">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
