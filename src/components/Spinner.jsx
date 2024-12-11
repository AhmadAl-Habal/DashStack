import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const LoadingSpinner = ({ isActive }) => {
  const spinnerStyle = { display: "block", margin: "30px auto" };
  return (
    <ClipLoader
      color="#44338ca"
      loading={isActive}
      cssOverride={spinnerStyle}
      size={150}
    />
  );
};

export default LoadingSpinner;
