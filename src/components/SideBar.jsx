import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const SideBar = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [logoutResponse, setLogOutResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const [loadingLogingout, setLoadingLogingout] = useState(false);

  const handleLogout = async () => {
    if (!token) {
      alert("Token not found. Please log in first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const apiResponse = await fetch(`https://vica.website/api/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await apiResponse.json();
      setLogOutResponse(result);
      console.log("Logout Response:", result);
    } catch (error) {
      setError(error.message);
      alert(`Error during Logging out: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    handleLogout();
  };
  useEffect(() => {
    if (logoutResponse && token) {
      localStorage.clear();
      setLoadingLogingout(true);
      setTimeout(() => {
        navigate("/sign-in");
      }, 2000);
    }
  }, [logoutResponse, token, navigate]);

  return (
    <div className="sidebar hidden md:flex w-[25%] h-[100vh] flex-col justify-between">
      <div>
        <div>
          <h1 className="text-center font-bold text-2xl mt-3 mb-10">
            <span className="text-blue-600">Dash</span>Stack
          </h1>
        </div>
        <div className="mt-10 p-5">
          <Link to="/products">
            <h1 className="text-center text-mainText text-md">Dashboard</h1>
          </Link>
          <h1 className="text-center text-white text-md mt-5 p-3 rounded-lg bg-blue-600">
            Products
          </h1>
        </div>
      </div>

      <button
        className="text-center text-mainText font-bold text-md mb-10"
        onClick={() => setIsPopupOpen(true)}
      >
        Logout
      </button>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="mb-4 text-lg font-semibold">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                onClick={logout}
              >
                {loadingLogingout ? "Deleting..." : "Yes"}
              </button>

              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={() => setIsPopupOpen(false)}
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
