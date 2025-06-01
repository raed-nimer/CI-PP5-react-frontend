import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/reducer/UserSlice";
import { useAuth } from "../context/AuthContext";

const baseUrl = import.meta.env.VITE_APP_SERVER_URL;

const Profile = () => {
  const { login } = useAuth();
  const accountsData = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem("accessToken");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/accounts/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) throw new Error("Failed to load profile");

        const data = await res.json();
        setProfileData(data);
        login(data, accessToken);
        dispatch(loginUser(data));
      } catch (err) {
        console.error("Error fetching profile:", err);
        toast.error("Error loading profile.");
      } finally {
        setLoading(false);
      }
    };
    if (!accountsData ){
      fetchProfile();
    }else{
      setProfileData({
        first_name: accountsData.first_name,
        last_name: accountsData.last_name,
        email: accountsData.email,
      });
      setLoading(false);
    }
  }, [accessToken]);

  const handleChange = (e) => {
    setProfileData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${baseUrl}/api/accounts/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          first_name: profileData.first_name,
          last_name: profileData.last_name,
        }),
      });

      if (!res.ok) throw new Error("Profile update failed");

      const data = await res.json();
      console.log('object', data);
      login(data.user, accessToken);
      dispatch(loginUser(data.user));
      toast.success(data.message || "Profile updated!");
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update profile.");
    }
  };

  if (loading) return <p className="text-center my-5">Loading profile...</p>;

  return (
    <>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
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
                    name="first_name"
                    className="form-control"
                    id="first-name"
                    value={profileData.first_name}
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
                    name="last_name"
                    className="form-control"
                    id="last-name"
                    value={profileData.last_name}
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
                    readOnly
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
