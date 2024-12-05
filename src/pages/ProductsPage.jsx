import React from "react";
import NavBar from "../components/NavBar";
import ProductsList from "../components/ProductsList";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
const ProductsPage = () => {
  // const [itemsResponse, setItemsResponse] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  // const location = useLocation();
  // console.log(token);

  const authorizate = token ? true : false;

  // const showAllItems = async () => {
  //   if (!token) {
  //     alert("Token not found. Please log in first.");
  //     return;
  //   }

  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const response = await fetch("https://vica.website/api/items", {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log(data);

  //     setItemsResponse(data);
  //   } catch (error) {
  //     setError(error.message);
  //     alert(`Error during fetching items: ${error.message}`);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     navigate("/products");
  //   }, 2000);
  //   showAllItems();
  // }, [location]);

  if (!authorizate) {
    return <p>No Authorization</p>;
  }
  return (
    <>
      {authorizate ? (
        <div className="w-full family-sans">
          <NavBar />
          <div className="pt-10 px-2 md:px-10 bg-gray-100 h-[95vh]">
            <div className="flex justify-between">
              <p className="text-3xl font-bold text-mainText">
                Manage Products
              </p>
              <Link
                className="text-sm bg-mainBlue p-3 px-5 rounded-lg text-white"
                to="/add-product"
              >
                + Add Product
              </Link>
            </div>
            <ProductsList  />
          </div>
        </div>
      ) : (
        <p>No Authorization</p> // You can replace this with your desired fallback UI
      )}
    </>
  );
};

export default ProductsPage;
