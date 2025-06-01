import react, { useState, useEffect } from "react";

const ShowCheckout = ({ cart, formData, handleChange, handleSubmit }) => {
  //   let subtotal = 0;
  //   let shipping = 30.0;
  //   let totalItems = 0;
  //   cart.forEach((item) => {
  //     subtotal += parseFloat(item.product.price) * item.quantity;
  //     totalItems += item.quantity;
  //   });

  const [subtotal, setSubtotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const shipping = 30.0;

  useEffect(() => {
    let newSubtotal = 0;
    let newTotalItems = 0;
    cart.forEach((item) => {
      newSubtotal += parseFloat(item.product.price) * item.quantity;
      newTotalItems += item.quantity;
    });
    setSubtotal(newSubtotal);
    setTotalItems(newTotalItems);
  }, [cart]);

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
                      autoComplete="false"
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
                    <input
                      type="text"
                      className="form-control"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-4 my-1">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      className="form-control"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
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

export default ShowCheckout;
