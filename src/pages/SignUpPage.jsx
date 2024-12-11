import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import shapeBg from "../assets/ShapeBG.png";
import uploadBackground from "../assets/Upload file background.png";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";

const SignUpPage = () => {
  const [registerResponse, setRegisterResponse] = useState("");
  const [previewUrlImage, setPreviewUrlImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [signupResponse, setSignupResponse] = useState(null);

  const signUpRequest = async () => {
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", LastName);
    formData.append("user_name", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", passwordConfirmation);
    formData.append("profile_image", profileImage);

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://vica.website/api/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      // if (!response.ok) {
      //   throw new Error("Failed to fetch data");
      // }

      const result = await response.json();
      setRegisterResponse(result.message);
      console.log(result);

      if (result.message === "User is created successfully.") {
        setSignupResponse("Signup Successfully, navigating to products...");
        setToken(result.data.token);
        setUserDetails(result.data.user);
      } else {
        setSignupResponse(result.msg);
        setError(result.msg);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("userDetails", JSON.stringify(userDetails));

      const timeoutId = setTimeout(() => {
        navigate("/products");
      }, 2000);
    }
  }, [token, navigate]);

  const submitSignUp = (e) => {
    e.preventDefault();
    setRegisterResponse("");
    signUpRequest();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);

      const preview = URL.createObjectURL(file);
      setPreviewUrlImage(preview);
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
              className="mt-5 h-[70vh] flex flex-col justify-between"
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
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setUserName(`${firstName}_${LastName}`);
                    }}
                  />
                </label>
                <label htmlFor="last-name" className="w-[50%]">
                  <h4 className="">Last Name</h4>
                  <input
                    className="bg-inputBg w-full border-2 border-inputBorder rounded-lg p-3 mt-1 outline-none"
                    type="text"
                    placeholder="Last Name"
                    name="last-name"
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setUserName(`${firstName}_${LastName}`);
                    }}
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
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <label htmlFor="confirm-password" className="w-[50%]">
                  <h4 className="">Confirm</h4>
                  <input
                    className="bg-inputBg w-full border-2 border-inputBorder rounded-lg p-3 mt-1 outline-none"
                    type="password"
                    placeholder="********"
                    name="confirm-password"
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                  />
                </label>
              </section>
              <section className="flex flex-col mt-5">
                <h4 className="">Profile Image</h4>
                <div className="flex">
                  <label
                    htmlFor="image"
                    className="w-[150px] h-[150px] bg-contain bg-no-repeat bg-center cursor-pointer mt-1 "
                    style={{
                      backgroundImage: `url(${
                        previewUrlImage || uploadBackground
                      })`,
                    }}
                  >
                    <input
                      className="bg-red-700 w-full rounded-lg p-3 mt-auto outline-none bg-transparent h-full hidden"
                      type="file"
                      placeholder=""
                      name="image"
                      id="image"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="text-red-700 font-bold text-lg ml-3">
                    {/* {error && <span>{error}</span>} */}
                    {registerResponse}
                    {loading && <Spinner className="" size="20" />}
                  </p>
                </div>
              </section>

              <input
                className="bg-mainBlue w-full rounded-lg p-3 text-white font-bold hover:cursor-pointer mt-auto"
                type="submit"
                value="Sign Up"
                onClick={submitSignUp}
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
