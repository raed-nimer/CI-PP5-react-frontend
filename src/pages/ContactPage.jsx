import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import toast, { Toaster } from "react-hot-toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    description: "",
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

    try {
      const response = await fetch(`${baseUrl}/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send contact form");
      }

      const data = await response.json();
      console.log("Success:", data);

      toast.success("Contact form submitted successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        description: "",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("There was an error submitting the form.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-5 py-4">
        <h1 className="text-center text-warning mb-4">Contact Us</h1>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow rounded-4 p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    id="subject"
                    placeholder="Enter Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={5}
                    className="form-control"
                    id="description"
                    placeholder="Enter description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="text-center">
                  <button className="btn btn-warning px-4" type="submit">
                    Send
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

export default ContactPage;
