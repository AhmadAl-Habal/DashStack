import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import { Link } from "react-router-dom";

const MainLayout = () => {
  const token = localStorage.getItem("token");
  // const location = useLocation();
  // console.log(token);

  const authorizate = token ? true : false;

  if (!authorizate) {
    return (
      <>
        <div className="text-3xl w-[100vw] h-[100vh] m-auto flex text-red-700 ">
          <div className="m-auto p-10 border-2 border-black rounded-lg">
            <p>No Authorization !!!</p>
            <p>
              Please SignIn
              <Link className="underline font-bold  ml-2" to="/sign-in">
                Here
              </Link>
            </p>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="flex">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
