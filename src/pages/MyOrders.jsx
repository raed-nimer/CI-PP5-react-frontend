import React, { useEffect, useState } from "react";
import { Navbar, Footer } from "../components";
import toast from "react-hot-toast";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const baseUrl = import.meta.env.VITE_APP_SERVER_URL;

  const fetchOrders = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/api/order/list/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error loading orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container my-5 py-4">
        <h1 className="text-center text-warning mb-4">My Orders</h1>

        {!isAuthenticated ? (
          <div className="text-center text-danger">
            You must be logged in to view your Orders.
          </div>
        ) : loading ? (
          <div className="text-center">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-muted">No orders found.</div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="card shadow rounded-4 p-4 mb-4">
              <h5 className="text-muted mb-3">
                Order #{order.id} - {new Date(order.created_at).toLocaleString()}
              </h5>
              <div className="row">
                {order.order_items.map((item) => (
                  <div key={item.id} className="col-md-6 col-lg-4 mb-3">
                    <div className="card h-100 border-0 shadow-sm">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="card-img-top rounded-top"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h6 className="card-title">{item.product.name}</h6>
                        <p className="card-text mb-1">
                          Quantity: <strong>{item.quantity}</strong>
                        </p>
                        <p className="card-text mb-1">
                          Price: <strong>${item.price_at_purchase}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-end mt-3">
                <strong>Total: ${order.total_price}</strong>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
