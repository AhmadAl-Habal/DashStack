import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import shapeBg from "../assets/ShapeBG.png";
import uploadBackground from "../assets/Upload file background.png";
import Spinner from "../components/Spinner";

const SignUpPage = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [userData, setUserData] = useState({});
  const [signupStatus, setSignupStatus] = useState(null);

  const handleRegister = async () => {
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("user_name", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", passwordConfirm);
    formData.append("profile_image", profileImage);

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("https://vica.website/api/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const result = await response.json();
      setResponseMessage(result.message);

      if (result.message === "User is created successfully.") {
        setSignupStatus("Signup successful, redirecting...");
        setAuthToken(result.data.token);
        setUserData(result.data.user);
      } else {
        setSignupStatus(result.msg);
        setErrorMessage(result.msg);
      }
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("token", authToken);
      localStorage.setItem("userData", JSON.stringify(userData));

      setTimeout(() => {
        navigate("/products");
      }, 2000);
    }
  }, [authToken, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setResponseMessage("");
    handleRegister();
  };

  const handleImageSelection = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  return (
    <div className="bg-red-700">
      <div
        style={{
          backgroundImage: `url(${shapeBg})`,
        }}
        className="h-screen w-full bg-cover bg-center flex justify-center items-center"
      >
        <div className="bg-white p-8 text-mainText w-5/6 lg:w-1/2 xl:w-1/3 rounded-lg border flex flex-col">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-3">Create Account</h1>
            <p>Please fill in your details to register.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col">
            <section className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="first-name" className="block">
                  First Name
                </label>
                <input
                  className="bg-gray-200 w-full border-2 border-gray-400 rounded-lg p-3 mt-2"
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setUserName(`${e.target.value}_${lastName}`);
                  }}
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="last-name" className="block">
                  Last Name
                </label>
                <input
                  className="bg-gray-200 w-full border-2 border-gray-400 rounded-lg p-3 mt-2"
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setUserName(`${firstName}_${e.target.value}`);
                  }}
                />
              </div>
            </section>

            <section className="mt-5">
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                className="bg-gray-200 w-full border-2 border-gray-400 rounded-lg p-3 mt-2"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </section>

            <section className="mt-5 flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="password" className="block">
                  Password
                </label>
                <input
                  className="bg-gray-200 w-full border-2 border-gray-400 rounded-lg p-3 mt-2"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="password-confirmation" className="block">
                  Confirm Password
                </label>
                <input
                  className="bg-gray-200 w-full border-2 border-gray-400 rounded-lg p-3 mt-2"
                  type="password"
                  placeholder="********"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </div>
            </section>

            <section className="mt-5">
              <label htmlFor="profile-image" className="block">
                Profile Image
              </label>
              <div className="flex items-center mt-2">
                <label
                  htmlFor="image"
                  className="w-36 h-36 bg-cover bg-center cursor-pointer"
                  style={{
                    backgroundImage: `url(${imagePreview || uploadBackground})`,
                  }}
                >
                  <input
                    type="file"
                    id="image"
                    className="hidden"
                    onChange={handleImageSelection}
                  />
                </label>
                <p className="ml-4 text-red-600 font-bold">{responseMessage}</p>
                {isLoading && <Spinner />}
              </div>
            </section>

            <button
              type="submit"
              className="bg-red-700 text-white p-3 rounded-lg mt-6 hover:bg-red-800"
            >
              Register
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-500">
              Already have an account?{" "}
              <Link to="/sign-in" className="text-red-700 font-semibold">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
