import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import shapeBg from "../assets/ShapeBG.png";
import uploadBackground from "../assets/Upload file background.png";
import { useState } from "react";

const SignUpPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  // const [loginResponse, setLoginResponse] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const [token, setToken] = useState(null);
  // const handleLogin = async () => {
  //   const formData = new FormData();
  //   formData.append("email", "mohammed.alkordy2@gmail.com");
  //   formData.append("password", "123123123");

  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const response = await fetch("https://vica.website/api/login", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const result = await response.text();

  //     setLoginResponse(result || "Login Successful!");
  //     const parsedResult = JSON.parse(result);
  //     const tokenVaule = parsedResult.token;
  //     setToken(tokenVaule);
  //     console.log(tokenVaule);
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const submitSignIn = (e) => {
    e.preventDefault();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);

      // Create a preview URL for the image
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };
  return (
    <div className="bg-mainBlue">
      <div
        style={{
          backgroundImage: `url(${shapeBg})`,
        }}
        className="h-100 w-100 h-screen w-full bg-cover bg-center  flex justify-center"
      >
        <div className="h-[95vh] bg-white p-7 mt-5 text-mainText w-5/6 lg:w-1/2 xl:w-1/3 rounded-lg border flex flex-col justify-between">
          <div>
            <div className="text-center">
              <h1 className="text-4xl font-sans font-bold mb-2">Sign Up</h1>
              <h4>Please enter your email and password to continue</h4>
            </div>

            <form
              className="mt-5 h-[75vh] flex flex-col justify-between"
              action=""
            >
              <section className="flex mt-5 justify-center space-x-4">
                <label htmlFor="first-name" className="w-[50%]">
                  <h4>First Name</h4>
                  <input
                    className="bg-inputBg w-full border-2 border-inputBorder rounded-lg p-3 mt-1 outline-none"
                    type="text"
                    placeholder="First Name"
                    name="first-name"
                  />
                </label>
                <label htmlFor="last-name" className="w-[50%]">
                  <h4 className="">Last Name</h4>
                  <input
                    className="bg-inputBg w-full border-2 border-inputBorder rounded-lg p-3 mt-1 outline-none"
                    type="text"
                    placeholder="Last Name"
                    name="last-name"
                  />
                </label>
              </section>
              <section className="flex mt-5 justify-center">
                <label htmlFor="email" className="w-[100%]">
                  <h4>Email</h4>
                  <input
                    className="bg-inputBg w-full border-2 border-inputBorder rounded-lg p-3 mt-1 outline-none"
                    type="email"
                    placeholder="Email"
                    name="email"
                  />
                </label>
              </section>
              <section className="flex mt-5 justify-center space-x-4">
                <label htmlFor="password" className="w-[50%]">
                  <h4>Password</h4>
                  <input
                    className="bg-inputBg w-full border-2 border-inputBorder rounded-lg p-3 mt-1 outline-none"
                    type="password"
                    placeholder="********"
                    name="password"
                  />
                </label>
                <label htmlFor="confirm-password" className="w-[50%]">
                  <h4 className="">Confirm</h4>
                  <input
                    className="bg-inputBg w-full border-2 border-inputBorder rounded-lg p-3 mt-1 outline-none"
                    type="password"
                    placeholder="********"
                    name="confirm-password"
                  />
                </label>
              </section>
              <section className="flex flex-col mt-5">
                <h4 className="">Profile Image</h4>
                <label
                  htmlFor="image"
                  className="w-[150px] h-[150px] bg-cover bg-center cursor-pointer mt-1"
                  style={{
                    backgroundImage: `url(${uploadBackground})`,
                  }}
                >
                  <input
                    className="bg-red-700 w-full rounded-lg p-3 mt-auto outline-none bg-transparent h-full hidden"
                    type="file"
                    placeholder=""
                    name="image"
                    id="image"
                  />
                </label>
              </section>
              <input
                className="bg-mainBlue w-full rounded-lg p-3 text-white font-bold hover:cursor-pointer mt-auto"
                type="submit"
                value="Sign In"
                onClick={submitSignIn}
              />
            </form>
            <div className="flex mt-2">
              <h4 className="text-gray-500 text-center w-full ">
                Already have an account?
                <Link
                  className="text-blue-700 ml-1 font-bold underline"
                  to="/sign-in"
                >
                  Sign In
                </Link>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
