import React, { useState } from "react";
import { Link } from "react-router";
import { Footer, Navbar } from "../components";
import axios from "axios";
import { loginUser } from "../redux/reducer/UserSlice";
import { useDispatch } from "react-redux";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const dispatch = useDispatch();
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data:", loginData);
    // Add your login logic here (API call etc.)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/accounts/login`,
        loginData
      );

      if (response.data.status === "success") {
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        console.log("Login successful:", response.data);

        dispatch(
          loginUser({
            user: response.data.user,
            token: response.data.access,
          })
        );
        login(response.data.user, response.data.access);
        // Redirect to dashboard or show success message
        navigate("/"); // Uncomment if using react-router for navigation
      }
    } catch (error) {
      console.error("Login error:", error);
    }
    // Reset form after submission
    setLoginData({
      email: "",
      password: "",
    });
    // Redirect to dashboard or show success message
    // navigate("/dashboard"); // Uncomment if using react-router for navigation
  };

  return (
    <>
      <Navbar />
      <div className="container my-5 py-4">
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