import React from "react";
import { Link } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Product = ({ id, name, price, image_url }) => {
  const [deleteItemResponse, setDeleteItemResponse] = useState(null);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleDeleteItem = async (id) => {
    if (!token) {
      alert("Token not found. Please log in first.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const apiResponse = await fetch(`https://vica.website/api/items/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await apiResponse.json();
      setDeleteItemResponse(result);
      console.log("Delete Item Response:", result);
    } catch (error) {
      setError(error.message);
      alert(`Error during deleting item: ${error.message}`);
    } finally {
      setIsPopupOpen(false);
      setLoading(false);
    }
  };
  const deleteItem = () => {
    handleDeleteItem(id);
    const timeoutId = setTimeout(() => {
      navigate("/products");
    }, 2000);
  };
  return (
    <div className="bg-white border border-inputBorder rounded">
      <div className="heading-list flex p-5 items-center space-x-2">
        <p className="product-id w-[15%]">{id}</p>
        <p className="product-name w-[35%] break-all">{name}</p>
        <p className="product-price w-[15%] break-all">{price}</p>
        <div className="product-image w-[17%]">
          <img src={image_url} alt="" className="h-[70px] w-[70px]" />
        </div>
        <div className="product-actions w-[10%] text-center md:flex justify-center space-x-3">
          <Link className="mx-auto" to={`/edit-product/${id}`}>
            <FaRegEdit color="gray" size={20} />
          </Link>
          <button className="mx-auto" onClick={() => setIsPopupOpen(true)}>
            <FaRegTrashCan color="red" size={20} />
          </button>
        </div>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="mb-4 text-lg font-semibold">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                onClick={deleteItem}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Yes"}
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={() => setIsPopupOpen(false)}
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
