import React from "react";
import Product from "./Product";
const ProductsList = () => {
  let data = [
    {
      id: 612,
      name: "samsung A15",
      price: "200",
      image_url: "https://vica.website/images/items/1733257411.jfif",
      created_at: "2024-12-03T20:23:31.000000Z",
      updated_at: "2024-12-03T20:23:31.000000Z",
    },
    {
      id: 613,
      name: "samsung A15",
      price: "200",
      image_url: "https://vica.website/images/items/1733257688.jfif",
      created_at: "2024-12-03T20:28:08.000000Z",
      updated_at: "2024-12-03T20:28:08.000000Z",
    },
    {
      id: 614,
      name: "samsung A15",
      price: "200",
      image_url: "https://vica.website/images/items/1733257726.jfif",
      created_at: "2024-12-03T20:28:46.000000Z",
      updated_at: "2024-12-03T20:28:46.000000Z",
    },
  ];
  return (
    <>
      <div className="bg-white mt-5 border-2 border-gray-200 rounded">
        <div className="heading-list flex px-5 py-2 font-bold">
          <p className="product-id w-[15%]">#</p>
          <p className="product-name w-[35%]">Product Name</p>
          <p className="product-price w-[15%]">Price</p>
          <p className="product-id w-[20%]">Image</p>
          <p className="product-id w-[10%]">Actions</p>
        </div>
        {data.map((productDetails) => (
          <Product
            id={productDetails.id}
            name={productDetails.name}
            price={productDetails.price}
            image_url={productDetails.image_url}
          />
        ))}
      </div>
    </>
  );
};

export default ProductsList;
