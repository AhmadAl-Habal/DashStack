import React from "react";
import NavBar from "../components/NavBar";

const EditProductPage = () => {
  return (
    <>
      <div className="w-full family-sans">
        <NavBar thumbNail="/ Edit" />
        <div className="pt-10 px-10 bg-gray-100 h-[90vh]">
          <p className="text-3xl font-bold text-mainText mb-10">Edit Product</p>
          <div>
            <form action="post" className="md:flex md:space-x-5 pt-10">
              <div className="w-full md:w-4/6">
                <label htmlFor="product-name" className="mb-5">
                  <p className="text-mainText mb-1 ">Product Name</p>
                  <input
                    className="bg-inputBg border-2 border-inputBorder rounded w-full p-3 mb-5"
                    type="text"
                  />
                </label>
                <label htmlFor="product-price">
                  <p className="text-mainText mb-1 ">Product Price</p>
                  <input
                    type="text"
                    className="bg-inputBg border-2 border-inputBorder rounded w-full p-3 mb-5"
                  />
                </label>
              </div>
              <div className="w-full md:w-2/6 bg-white flex justify-center items-center">
                <label
                  htmlFor="image"
                  className="w-[150px] h-[150px] bg-cover bg-center cursor-pointer inline-block"
                  style={{
                    backgroundImage: `url('https://placehold.co/600x400')`,
                  }}
                >
                  <input
                    className="bg-red-700 w-full rounded-lg p-3 mt-auto outline-none bg-transparent h-full hidden"
                    type="file"
                    placeholder=""
                    name="image"
                    id="image"
                  />
                </label>
              </div>
            </form>
          </div>
          <div className="flex justify-between mt-5">
            <button className="text-sm bg-mainBlue p-3 px-5 rounded-lg text-white w-40">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProductPage;
