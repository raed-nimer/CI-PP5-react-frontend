import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components";

const Profile = () => {
  // Mock user data (could come from Redux or localStorage in real use)
  const mockUser = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
  };

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    // Load mock user data on mount
    setProfileData(mockUser);
  }, []);

  const handleChange = (e) => {
    setProfileData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated profile data:", profileData);
    alert("Profile updated (frontend only).");
  };

  return (
    <>
      <Navbar />
      <div className="container my-5 py-4">
        <h1 className="text-center text-warning mb-4">My Profile</h1>
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
                    value={profileData.firstName}
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
                    value={profileData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    value={profileData.email}
                    onChange={handleChange}
                    required
                    disabled
                  />
                </div>
                <div className="text-center">
                  <button className="btn btn-warning px-4" type="submit">
                    Update Profile
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

export default Profile;