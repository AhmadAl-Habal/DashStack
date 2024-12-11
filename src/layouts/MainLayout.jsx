import React from "react";
import { Outlet } from "react-router-dom";
import SideBarComponent from "../components/SideBar";
import { Link } from "react-router-dom";

const LayoutWrapper = () => {
  const authToken = localStorage.getItem("token");
  const isAuthenticated = !!authToken;

  if (!isAuthenticated) {
    return (
      <div className="text-3xl w-full h-screen flex text-red-700">
        <div className="m-auto p-10 border-2 border-black rounded-lg">
          <p>Access Denied !!!</p>
          <p>
            Please Sign In
            <Link className="underline font-bold ml-2" to="/sign-in">
              Here
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <SideBarComponent />
      <Outlet />
    </div>
  );
};

export default LayoutWrapper;
