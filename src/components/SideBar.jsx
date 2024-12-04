import React from "react";
import { Link } from "react-router-dom";
const SideBar = () => {
  return (
    <div className="sidebar hidden md:flex w-[25%] h-[100vh]  flex-col justify-between">
      <div>
        <div>
          <h1 className="text-center font-bold text-2xl mt-3 mb-10">
            <span className="text-blue-600">Dash</span>Stack
          </h1>
        </div>
        <div className="mt-10 p-5">
          <Link to="/products">
            <h1 className="text-center text-mainText text-md ">Dashboard</h1>
          </Link>
          <h1 className="text-center text-white text-md mt-5 p-3 rounded-lg bg-blue-600">
            Products
          </h1>
        </div>
      </div>
      <Link className="text-center text-mainText font-bold text-md mb-10" to="/">
        Logout
      </Link>
    </div>
  );
};

export default SideBar;
