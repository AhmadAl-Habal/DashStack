import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <div className="bg-white p-8 border-2 border-gray-600 rounded-xl shadow-lg text-center">
        <h2 className="text-4xl text-red-600">404 - Page Not Found</h2>
        <p className="mt-4">
          Oops, looks like you're lost. Go back to{" "}
          <Link
            to="/sign-in"
            className="text-red-600 font-semibold hover:underline"
          >
            Sign In
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
