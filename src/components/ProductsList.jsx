import React, { useState, useEffect } from "react";
import Product from "./Product";
import { useLocation } from "react-router-dom";
import Spinner from "./Spinner";
const ProductsList = () => {
  const [itemsResponse, setItemsResponse] = useState([]);
  const [loading, setLoading] = useState(true); // Default to loading
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const location = useLocation();

  const showAllItems = async () => {
    if (!token) {
      setError("Token not found. Please log in first.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("https://vica.website/api/items", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      setItemsResponse(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    showAllItems();
  }, [location]);

  return (
    <div className="bg-white mt-5 border-2 border-gray-200 rounded">
      <div className="heading-list flex px-5 py-2 font-bold">
        <p className="product-id w-[15%]">#</p>
        <p className="product-name w-[35%]">Product Name</p>
        <p className="product-price w-[15%]">Price</p>
        <p className="product-id w-[20%]">Image</p>
        <p className="product-id w-[10%]">Actions</p>
      </div>

      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : itemsResponse.length === 0 ? (
        <p className="text-center">No items to display.</p>
      ) : (
        itemsResponse.map((productDetails, index) => (
          <Product
            key={index}
            id={productDetails.id}
            name={productDetails.name}
            price={productDetails.price}
            image_url={productDetails.image_url}
          />
        ))
      )}
    </div>
  );
};

export default ProductsList;
