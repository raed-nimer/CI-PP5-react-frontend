import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Footer, Navbar } from "../components";
import { Link } from "react-router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../redux/reducer/UserSlice";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setRegisterData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/accounts/register`,
        registerData
      );
      console.log("Registration successful:", response.data);

      if (response.data.status === "success") {
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);

        dispatch(
          registerUser({
            user: response.data.user,
            token: response.data.access,
          })
        );

         toast.success("Registration successful!");

        setTimeout(() => {
          navigate("/");
        }, 2000); // Redirect to dashboard after 2 seconds
      }
    } catch (error) {
      console.error("Registration error:", error.message);
    }
    // Reset form after submission
    setRegisterData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    // Redirect to login page or show success message
    // navigate("/login"); // Uncomment if using react-router for navigation
    // or show a success message
    // alert("Registration successful! Please log in.");
  };

  return (
    <>
      <Navbar />
      <div className="container my-5 py-4">
        <h1 className="text-center text-warning mb-4">Register</h1>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow rounded-4 p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="first-name" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    id="first-name"
                    placeholder="Enter your First name"
                    value={registerData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="last-name" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    id="last-name"
                    placeholder="Enter your last name"
                    value={registerData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
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
                    value={registerData.email}
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
                    value={registerData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <p>
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-decoration-underline text-info"
                    >
                      Login
                    </Link>
                  </p>
                </div>
                <div className="text-center">
                  <button className="btn btn-warning px-4" type="submit">
                    Register
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

export default Register;
