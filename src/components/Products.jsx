import React, { useState, useEffect } from "react";
import Product from "./Product";
import { useLocation } from "react-router-dom";
import Spinner from "./Spinner";

const ProductsList = () => {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const userToken = localStorage.getItem("token");
  const currentLocation = useLocation();

  const fetchAllProducts = async () => {
    if (!userToken) {
      setFetchError("User token not found. Please log in.");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const apiResult = await fetch("https://vica.website/api/items", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!apiResult.ok) {
        throw new Error(`Failed to fetch: ${apiResult.status}`);
      }

      const apiData = await apiResult.json();
      console.log("Fetched Products:", apiData);

      setProductList(apiData);
    } catch (error) {
      setFetchError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, [currentLocation]);

  return (
    <div className="bg-gray-50 mt-4 border border-gray-300 rounded-lg">
      <div className="flex px-5 py-3 font-semibold bg-gray-200 rounded-t-md">
        <p className="w-[10%] text-gray-800">#</p>
        <p className="w-[40%] text-gray-800">Product Name</p>
        <p className="w-[15%] text-gray-800">Price</p>
        <p className="w-[20%] text-gray-800">Image</p>
        <p className="w-[10%] text-gray-800">Actions</p>
      </div>

      {isLoading ? (
        <Spinner />
      ) : fetchError ? (
        <p className="text-center text-red-500">{fetchError}</p>
      ) : productList.length === 0 ? (
        <p className="text-center py-4">No products available.</p>
      ) : (
        productList.map((product, idx) => (
          <Product
            key={idx}
            id={product.id}
            name={product.name}
            price={product.price}
            image_url={product.image_url}
          />
        ))
      )}
    </div>
  );
};

export default ProductsList;
