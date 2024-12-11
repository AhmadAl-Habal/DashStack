import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

const Product = ({ id, name, price, image_url }) => {
  const [responseMessage, setResponseMessage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const userToken = localStorage.getItem("token");
  const redirect = useNavigate();

  const removeProduct = async (productId) => {
    if (!userToken) {
      alert("No token found! Please log in.");
      return;
    }
    setDeleteLoading(true);
    setErrorMsg("");

    try {
      const request = await fetch(
        `https://vica.website/api/items/${productId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const apiData = await request.json();
      setResponseMessage(apiData);
    } catch (error) {
      setErrorMsg(error.message);
      alert("Failed to delete product: " + error.message);
    } finally {
      setShowPopup(false);
      setDeleteLoading(false);
    }
  };

  const confirmDelete = () => {
    removeProduct(id);
    setTimeout(() => {
      redirect("/products");
    }, 1500);
  };

  return (
    <div className="bg-gray-50 border border-gray-300 rounded-md">
      <div className="flex items-center p-4 space-x-2">
        <p className="text-sm w-[10%] text-gray-700">{id}</p>
        <p className="text-sm w-[40%] text-gray-900 truncate">{name}</p>
        <p className="text-sm w-[15%] text-gray-900">{price} $</p>
        <div className="w-[20%]">
          <img
            src={image_url}
            alt="Product image"
            className="h-16 w-16 rounded-md"
          />
        </div>
        <div className="flex items-center w-[15%] space-x-3">
          <Link to={`/edit-product/${id}`}>
            <FaRegEdit className="text-gray-500" size={18} />
          </Link>
          <button onClick={() => setShowPopup(true)}>
            <FaRegTrashCan className="text-red-600" size={18} />
          </button>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <p className="text-lg mb-4">Confirm product deletion?</p>
            <div className="flex justify-between space-x-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={confirmDelete}
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Yes"}
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={() => setShowPopup(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
