import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NavBar = ({ thumbNail = "" }) => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails")) || {};
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
    <>
      <div className="flex justify-between items-center h-[5vh] px-2 sm:px-5 md:px-10">
        <Link to="/products">
          <p className="text-center text-mainText text-md ">
            Products {thumbNail}
          </p>
        </Link>
        <div className="flex space-x-3">
          <button
            className=" md:hidden ml-5 text-red-700 border-red-700 border-2 rounded-lg px-5 h-8 my-auto"
            to="/"
            onClick={() => setIsPopupOpen(true)}
          >
            Logout
          </button>
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
    </>
  );
};

export default NavBar;
