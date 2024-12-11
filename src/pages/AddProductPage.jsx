import React, { useState, useEffect } from "react";
import NavBarComponent from "../components/NavBar";
import { useParams, useNavigate } from "react-router-dom";
import SpinnerLoader from "../components/Spinner";
import imagePlaceHolder from "../assets/Upload file background.png";
const AddProductPage = () => {
  const { id } = useParams();
  const [productTitle, setProductTitle] = useState("");
  const [productCost, setProductCost] = useState("");
  const [productImageFile, setProductImageFile] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(imagePlaceHolder);
  const userToken = localStorage.getItem("token");
  const [isSubmitting, setIsSubmitting] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [apiResponse, setApiResponse] = useState("");
  const navigation = useNavigate();

  const handleFileInput = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setProductImageFile(uploadedFile);
      setImagePreviewUrl(URL.createObjectURL(uploadedFile));
    }
  };

  const submitProductData = async () => {
    setIsSubmitting(true);
    if (!userToken) {
      alert("Authorization token is missing. Please log in.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const formPayload = new FormData();
      formPayload.append("name", productTitle);
      formPayload.append("price", productCost);
      formPayload.append("image", productImageFile);

      const response = await fetch(`https://vica.website/api/items`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: formPayload,
      });

      const responseData = await response.json();
      setApiResponse(responseData.message);
      if (responseData.message === "item add successfully") {
        setTimeout(() => {
          navigation("/products");
        }, 2000);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setApiResponse(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    submitProductData();
  };

  return (
    <div className="w-full family-sans">
      <NavBarComponent thumbNail="/ Add" />
      <div className="pt-10 px-10 bg-gray-100 h-[93vh]">
        <p className="text-3xl font-bold text-mainText mb-10">
          Add New Product
        </p>
        <div>
          <form action="post">
            <div className="md:flex md:space-x-5 pt-10">
              <div className="w-4/6">
                <label htmlFor="product-name" className="mb-5">
                  <p className="text-mainText mb-1">Product Title</p>
                  <input
                    className="bg-inputBg border-2 border-inputBorder rounded w-full p-3 mb-5"
                    type="text"
                    placeholder="Enter Product Title"
                    onChange={(e) => setProductTitle(e.target.value)}
                  />
                </label>
                <label htmlFor="product-price">
                  <p className="text-mainText mb-1">Product Price</p>
                  <input
                    type="number"
                    className="bg-inputBg border-2 border-inputBorder rounded w-full p-3 mb-5"
                    placeholder="Enter Product Price"
                    onChange={(e) => setProductCost(e.target.value)}
                    value={productCost}
                  />
                </label>
              </div>
              <div className="w-2/6 bg-white flex justify-center items-center">
                <label
                  htmlFor="image"
                  className="w-[150px] h-[150px] bg-contain bg-no-repeat bg-center cursor-pointer inline-block"
                  style={{
                    backgroundImage: `url('${
                      imagePreviewUrl || productImageFile
                    }')`,
                  }}
                >
                  <input
                    className="hidden"
                    type="file"
                    name="image"
                    id="image"
                    onChange={handleFileInput}
                  />
                </label>
              </div>
            </div>
            <div className="flex justify-between mt-5">
              <input
                type="submit"
                className="text-sm bg-mainred p-3 px-5 rounded-lg text-white w-40 cursor-pointer"
                value="Save"
                onClick={handleFormSubmission}
              />
            </div>
          </form>
        </div>

        <p className="pt-10 font-bold text-2xl text-red-800 text-center">
          {isSubmitting ? <SpinnerLoader /> : apiResponse}
        </p>
      </div>
    </div>
  );
};

export default AddProductPage;
