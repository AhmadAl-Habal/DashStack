import React from "react";
import NavBar from "../components/NavBar";
import ProductsList from "../components/Products";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const userToken = localStorage.getItem("token");

  const isAuthorized = userToken ? true : false;

  return (
    <>
      <div className="w-full font-sans">
        <NavBar />
        <div className="pt-12 px-4 lg:px-12 bg-gray-100 h-[93vh]">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-semibold text-primaryText">
              Product Management
            </h2>
            <Link
              className="text-md bg-red-600 p-4 rounded-md text-white hover:bg-red-600 transition"
              to="/add-product"
            >
              + Add New Product
            </Link>
          </div>
          <ProductsList />
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
