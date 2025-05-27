import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router";
import toast from "react-hot-toast";
import { addCart } from "../redux/reducer/CartSlice";
const Products = () => {
  const productsState = useSelector((state) => state.products);
  console.log("productsState:", productsState);

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [category, setCategory] = useState([]);
  console.log("data:", data);
  console.log("filter:", filter);

  console.log(filter);
  const dispatch = useDispatch();

  const addProduct = async (product) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      // Guest user: save to localStorage
      let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];

      const existingItemIndex = guestCart.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingItemIndex > -1) {
        guestCart[existingItemIndex].quantity += 1;
      } else {
        guestCart.push({ product, quantity: 1 });
      }

      localStorage.setItem("guestCart", JSON.stringify(guestCart));
      toast.success("Item added to guest cart!");
      dispatch(addCart(product));
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/cart/add/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            product_id: product.id,
            quantity: 1,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(
          `Failed to add to cart: ${
            errorData.error || JSON.stringify(errorData)
          }`
        );
        return;
      }

      await response.json();
      toast.success("Item added to cart successfully!");
      // fetchCartCount();
      dispatch(addCart(product));
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Something went wrong adding to cart.");
    }
  };

  useEffect(() => {
    if (productsState.state === "fulfilled") {
      setData(productsState.products);
      setFilter(productsState.products);
      setCategory(productsState.category);
    }
  }, [productsState.state]);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          {
              category?.map((category) => (
               <button
                  key={category.id}
                  className="btn btn-outline-dark btn-sm m-2"
                  onClick={() => filterProduct(category.name)}
                >
                  {category.name}
                </button>
            ))
          }
        </div>

        {filter.map((product) => {
          return (
            <div
              id={product.id}
              key={product.id}
              className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
            >
              <div className="card text-center h-100" key={product.id}>
                <img
                  className="card-img-top p-3 object-fit-contain"
                  src={product.image}
                  alt="Card"
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.name.substring(0, 12)}...
                  </h5>
                  <p className="card-text">
                    {product.description.substring(0, 90)}...
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">$ {product.price}</li>
                  {/* <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li> */}
                </ul>
                <div className="card-body">
                  <Link
                    to={"/product/" + product.id}
                    className="btn btn-warning m-1"
                  >
                    View Details
                  </Link>
                  <button
                    className="btn btn-warning m-1"
                    onClick={() => {
                      addProduct(product);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {productsState.loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
