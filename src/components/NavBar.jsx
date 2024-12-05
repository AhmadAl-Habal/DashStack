import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ thumbNail = "" }) => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  return (
    <>
      <div className="flex justify-between items-center h-[5vh] px-2 sm:px-5 md:px-10">
        <Link to="/products">
          <p className="text-center text-mainText text-md ">
            Products {thumbNail}
          </p>
        </Link>
        <div className="flex space-x-3">
          <Link
            className=" md:hidden ml-5 text-red-700 border-red-700 border-2 rounded-lg px-5 h-8 my-auto"
            to="/"
          >
            Logout
          </Link>
          <div className="rounded-xl">
            <img
              className="w-[40px] h-full rounded-xl"
              src={`${userDetails.profile_image_url}`}
              alt=""
            />
          </div>
          <div>
            <p>{userDetails.first_name}</p>
            <p className="text-gray-700">{userDetails.last_name}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
