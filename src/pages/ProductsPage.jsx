import React from "react";
import NavBar from "../components/NavBar";
import ProductsList from "../components/ProductsList";
import { Link, useLocation } from "react-router-dom";

const ProductsPage = () => {
  const token = localStorage.getItem("token");

  const authorizate = token ? true : false;

  return (
    <>
      <div className="w-full family-sans">
        <NavBar />
        <div className="pt-10 px-2 md:px-10 bg-gray-100 h-[95vh]">
          <div className="flex justify-between">
            <p className="text-3xl font-bold text-mainText">Manage Products</p>
            <Link
              className="text-sm bg-mainBlue p-3 px-5 rounded-lg text-white"
              to="/add-product"
            >
              + Add Product
            </Link>
          </div>
          <ProductsList />
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
