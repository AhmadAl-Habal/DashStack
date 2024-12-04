import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const MainLayout = () => {
  return (
    <div className="flex">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
