import React from 'react';
import { Navbar } from "../components";

export default function OrderPlace() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800">
            Order Placed Successfully
          </h1>
          <p className="text-gray-600 mt-2">
            Thank you for your purchase! Your order has been received and is being processed.
          </p>
         
        </div>
      </div>
    </>
  );
}
