import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ thumbNail }) => {
  const navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState(false);
  const [logoutRes, setLogoutRes] = useState(null);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const userToken = localStorage.getItem("token");

  const logoutHandler = async () => {
    if (!userToken) {
      alert("No token found! Please log in.");
      return;
    }
    setLoadingLogout(true);
    setErrorMsg("");

    try {
      const res = await fetch("https://vica.website/api/logout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      const data = await res.json();
      setLogoutRes(data);
    } catch (err) {
      setErrorMsg(err.message);
      alert("Logout failed: " + err.message);
    } finally {
      setLoadingLogout(false);
    }
  };

  const onLogoutClick = () => {
    logoutHandler();
  };

  useEffect(() => {
    if (logoutRes && userToken) {
      localStorage.clear();
      setTimeout(() => {
        navigate("/sign-in");
      }, 1500);
    }
  }, [logoutRes, userToken, navigate]);

  return (
    <div className="flex justify-between items-center h-[7vh] px-3 md:px-8">
      <div className="flex">
        <Link to="/products">
          <h1 className="text-lg font-bold text-gray-800">Products </h1>
        </Link>
        <p className="text-lg font-bold text-gray-800 cursor-pointer">
          {thumbNail}
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <button
          className="text-red-600 border border-red-600 rounded-md px-4 py-1 hover:bg-red-100 md:hidden"
          onClick={() => setPopupVisible(true)}
        >
          Logout
        </button>
        <div className="w-10 h-10 overflow-hidden rounded-full">
          <img
            src={userData.profile_image_url || ""}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-medium">{userData.first_name}</p>
          <p className="text-gray-500 text-sm">{userData.last_name}</p>
        </div>
      </div>

      {popupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white p-5 rounded-md shadow-lg">
            <p className="text-lg mb-4">Do you really want to logout?</p>
            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={onLogoutClick}
              >
                {loadingLogout ? "Logging out..." : "Yes"}
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                onClick={() => setPopupVisible(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
