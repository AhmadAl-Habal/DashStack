import React from "react";
import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <>
      <div className="text-3xl w-[100vw] h-[100vh] m-auto flex text-red-700 ">
        <div className="m-auto p-10 border-2 border-black rounded-lg">
          <p>404 Not Found</p>
          <p>
            Back to SignIn
            <Link className="underline font-bold  ml-2" to="/sign-in">
              Here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
