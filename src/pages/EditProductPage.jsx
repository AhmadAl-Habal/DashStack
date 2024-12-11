import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const EditProductPage = () => {
  const { id } = useParams();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateResponse, setUpdateResponse] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://vica.website/api/items/${id}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setProductName(data.name);
        setProductPrice(data.price);
        setImagePreview(data.image_url);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id, token]);

  const updateProduct = async () => {
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
      formData.append("_method", "PUT");

      const response = await fetch(`https://vica.website/api/items/${id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      setUpdateResponse(result.message);

      if (result.message === "item update successfully") {
        setTimeout(() => {
          navigate("/products");
        }, 2000);
      }
    } catch (err) {
      setError(err.message);
      setUpdateResponse(err.message);
    } finally {
      setLoading(false);
    }
  };

  const submitEditProduct = (e) => {
    e.preventDefault();
    updateProduct();
  };

  return (
    <div className="w-full family-sans">
      <NavBar thumbNail="/ Edit" />
      <div className="pt-10 px-10 bg-gray-100 h-[93vh]">
        <p className="text-3xl font-bold text-mainText mb-10">
          Edit Product {id}
        </p>

        {error && <span className="text-red-500">{error}</span>}
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <form action="post" className="mb-10">
              <div className="md:flex md:space-x-5 pt-10">
                <div className="w-full md:w-4/6">
                  <label htmlFor="product-name" className="mb-5">
                    <p className="text-mainText mb-1">Product Name</p>
                    <input
                      className="bg-inputBg border-2 border-inputBorder rounded w-full p-3 mb-5"
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </label>
                  <label htmlFor="product-price">
                    <p className="text-mainText mb-1">Product Price</p>
                    <input
                      type="number"
                      className="bg-inputBg border-2 border-inputBorder rounded w-full p-3 mb-5 appearance-none"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                    />
                  </label>
                </div>
                <div className="w-full md:w-2/6 bg-white flex justify-center items-center">
                  <label
                    htmlFor="image"
                    className="w-[150px] h-[150px] bg-contain bg-no-repeat bg-center cursor-pointer inline-block"
                    style={{
                      backgroundImage: `url('${imagePreview || productImage}')`,
                    }}
                  >
                    <input
                      className="hidden"
                      type="file"
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
                  className="text-sm bg-mainred p-3 px-5 rounded-lg text-white w-40 cursor-pointer"
                  value="Save"
                  onClick={submitEditProduct}
                />
              </div>
            </form>
            <p className="pt-10 font-bold text-2xl text-red-800 text-center">
              {updateResponse}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProductPage;
