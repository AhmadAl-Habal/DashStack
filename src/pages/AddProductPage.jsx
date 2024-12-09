import React from "react";
import NavBar from "../components/NavBar";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useState, useEffect } from "react";
const AddProductPage = () => {
  const { id } = useParams();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(null);
  const [addResponse, setAddResponse] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const addProduct = async () => {
    setLoading(true);
    if (!token) {
      alert("Token not found. Please log in first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("price", productPrice);
      formData.append("image", productImage);

      const updateRes = await fetch(`https://vica.website/api/items`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

 

      const result = await updateRes.json();
      setAddResponse(result.message);
      if (result.message === "item add successfully") {
        setTimeout(() => {
          navigate("/products");
        }, 2000);
      }
    } catch (error) {
      setError(error.message);

      setAddResponse(error.message);
    } finally {
      setLoading(false);
    }
  };

  const submitAddProduct = (e) => {
    e.preventDefault();

    addProduct();
  };
  return (
    <div className="w-full family-sans">
      <NavBar thumbNail="/ Add" />
      <div className="pt-10 px-10 bg-gray-100 h-[90vh]">
        <p className="text-3xl font-bold text-mainText mb-10">Add Product</p>
        <div>
          <form action="post" className="">
            <div className="md:flex md:space-x-5 pt-10">
              <div className="w-4/6">
                <label htmlFor="product-name" className="mb-5">
                  <p className="text-mainText mb-1 ">Product Name</p>
                  <input
                    className="bg-inputBg border-2 border-inputBorder rounded w-full p-3 mb-5"
                    type="text"
                    placeholder="Product Name"
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </label>
                <label htmlFor="product-price">
                  <p className="text-mainText mb-1 ">Product Price</p>
                  <input
                    type="number"
                    className="bg-inputBg border-2 border-inputBorder rounded w-full p-3 mb-5"
                    placeholder="Product Price"
                    onChange={(e) => {
                     
                     
                        setProductPrice(e.target.value);
                      
                    }}
                    value={productPrice}
                  />
                </label>
              </div>
              <div className="w-2/6 bg-white flex justify-center items-center">
                <label
                  htmlFor="image"
                  className="w-[150px] h-[150px] bg-cover bg-center cursor-pointer inline-block "
                  style={{
                    backgroundImage: `url('${imagePreview || productImage}')`,
                  }}
                >
                  <input
                    className="bg-red-700 w-full rounded-lg p-3 mt-auto outline-none bg-transparent h-full hidden "
                    type="file"
                    placeholder=""
                    name="image"
                    id="image"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
            <div className="flex justify-between mt-5">
              <input
                type="submit"
                className="text-sm bg-mainBlue p-3 px-5 rounded-lg text-white w-40 cursor-pointer"
                value="Save"
                onClick={submitAddProduct}
              />
            </div>
          </form>
        </div>

        <p className="pt-10 font-bold text-2xl text-red-800 text-center">
          {loading ? <Spinner /> : addResponse}
        </p>
      </div>
    </div>
  );
};

export default AddProductPage;
