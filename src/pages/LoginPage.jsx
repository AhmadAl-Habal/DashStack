import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import shapeBg from "../assets/ShapeBG.png";
import Spinner from "../components/Spinner";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [userInfo, setUserInfo] = useState({});

  const performLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      return;
    }
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("https://vica.website/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: data,
      });

      const result = await response.json();
      console.log("Response:", result);

      if (result.msg === "incorrect email or password") {
        setLoginStatus(result.msg);
        setErrorMessage(result.msg);
      } else {
        setLoginStatus("Login successful, redirecting...");
        setAuthToken(result.token);
        setUserInfo(result.user);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("token", authToken);
      localStorage.setItem("userData", JSON.stringify(userInfo));
      console.log(userInfo);
      const timeout = setTimeout(() => {
        navigate("/products");
      }, 2000);
    }
  }, [authToken, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    performLogin();
  };

  return (
    <div className="bg-red-700">
      <div
        style={{
          backgroundImage: `url(${shapeBg})`,
        }}
        className="h-screen w-full bg-cover bg-center flex justify-center items-center"
      >
        <div className="bg-white p-6 w-4/5 md:w-1/2 lg:w-1/3 rounded-lg shadow-xl">
          <div className="text-center">
            <h1 className="text-4xl font-semibold mb-3">Log In</h1>
            <p>Please enter your credentials to continue.</p>
          </div>

          <form className="mt-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-lg">
                Email
              </label>
              <input
                className="w-full bg-gray-200 border-2 border-gray-400 rounded-lg p-3 mt-2"
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-6">
              <label htmlFor="password" className="block text-lg">
                Password
              </label>
              <input
                className="w-full bg-gray-200 border-2 border-gray-400 rounded-lg p-3 mt-2"
                type="password"
                placeholder="********"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <p className="mt-6 text-red-600 font-semibold text-lg">
              {errorMessage}
              {loginStatus}
              {isLoading && <Spinner />}
            </p>

            <button
              type="submit"
              className="w-full bg-red-700 text-white p-3 rounded-lg mt-8 hover:bg-red-800 transition"
            >
              Log In
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-500">
              Don't have an account?{" "}
              <Link className="text-red-700 font-semibold" to="/">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
