import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState(false);
  const userToken = localStorage.getItem("token");
  const [logoutResult, setLogoutResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [apiError, setApiError] = useState(null);
  const [isLogoutInProgress, setIsLogoutInProgress] = useState(false);

  const processLogout = async () => {
    if (!userToken) {
      alert("No token found. Please log in.");
      return;
    }

    setIsProcessing(true);
    setApiError(null);

    try {
      const logoutRequest = await fetch(`https://vica.website/api/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      const logoutData = await logoutRequest.json();
      setLogoutResult(logoutData);
      console.log("Logout Data:", logoutData);
    } catch (err) {
      setApiError(err.message);
      alert(`Logout failed: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const initiateLogout = () => {
    processLogout();
  };

  useEffect(() => {
    if (logoutResult && userToken) {
      localStorage.clear();
      setIsLogoutInProgress(true);
      setTimeout(() => {
        navigate("/sign-in");
      }, 2000);
    }
  }, [logoutResult, userToken, navigate]);

  return (
    <div className="sidebar hidden md:flex w-[25%] h-[100vh] flex-col justify-between">
      <div>
        <div>
          <h1 className="text-center font-bold text-2xl mt-3 mb-10">
            <span className="text-red-600">My</span>Inventory
          </h1>
        </div>
        <div className="mt-10 p-5">
          <Link to="/products">
            <h1 className="text-center text-mainText text-md">Dashboard</h1>
          </Link>
          <h1 className="text-center text-white text-md mt-5 p-3 rounded-lg bg-red-600">
            Products
          </h1>
        </div>
      </div>

      <button
        className="text-center font-bold text-md mb-10 text-red-600 border border-red-600 rounded-md px-4 py-1 hover:bg-red-100 w-[90%] mx-auto"
        onClick={() => setPopupVisible(true)}
      >
        Logout
      </button>

      {popupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="mb-4 text-lg font-semibold">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                onClick={initiateLogout}
              >
                {isLogoutInProgress ? "Processing..." : "Yes"}
              </button>

              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
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

export default SideBar;
