import React from "react";

const Home = () => {
  return (
    <>
      <div className="hero border-bottom pb-3">
        <div className="card bg-dark text-white border-0 position-relative">
          <img
            className="card-img img-fluid"
            src="./assets/gym-2.webp"
            alt="Card"
            style={{ height: "75vh", objectFit: "cover", width: "100%" }}
          />
          <div className="card-img-overlay d-flex align-items-center justify-content-center text-center bg-dark bg-opacity-50">
            <div className="container">
              <h1 className="display-3 fw-bold text-warning mb-3 animate__animated animate__fadeInDown">
                New Season Arrivals
              </h1>
              <p className="lead text-light d-none d-sm-block animate__animated animate__fadeInUp">
                Discover our latest collection of premium fitness gear. Style meets performance like never before.
              </p>
              <a href="/product" className="btn btn-warning btn-lg mt-4 shadow-lg animate__animated animate__zoomIn">
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
