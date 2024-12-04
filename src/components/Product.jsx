import React from "react";
import { Link } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
const Product = (product) => {
  return (
    <div className="bg-white border border-inputBorder rounded">
      {/* {test.map((number) => (
    <Product content={number} />
    
  ))} */}
      <div className="heading-list flex p-5 items-center">
        <p className="product-id w-[15%]">{product.id}</p>
        <p className="product-name w-[35%]">{product.name}</p>
        <p className="product-price w-[15%]">{product.price}</p>
        <div className="product-image w-[20%] ">
          <img src={product.image_url} alt="" className="h-[70px]" />
        </div>
        <div className="product-actions w-[10%] text-center md:flex justify-center space-x-3">
          <Link className="mx-auto" to="/edit-product">
            <FaRegEdit color="gray" size={20} />
          </Link>
          <button className="mx-auto">
            <FaRegTrashCan color="red" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
