import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import shapeBg from "../assets/ShapeBG.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginResponse, setLoginResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [userDetails, setUserDetails] = useState({});

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://vica.website/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const result = await response.json();
      console.log("Response:", result);

      if (result.msg === "incorrect email or password") {
        setLoginResponse(result.msg);
        setError(result.msg);
      } else {
        setLoginResponse("Login Successfully, navigating to products...");
        setToken(result.token);
        setUserDetails(result.user);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      console.log(userDetails);
      const timeoutId = setTimeout(() => {
        navigate("/products");
      }, 2000);
    }
  }, [token, navigate]);

  const submitSignIn = (e) => {
    e.preventDefault();
    handleLogin();
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
              <h1 className="text-4xl font-sans font-bold mb-2">Sign In</h1>
              <h4>Please enter your email and password to continue</h4>
            </div>

            <form className="mt-5 h-[75vh] flex flex-col justify-between">
              <section>
                <label htmlFor="email">
                  <h4>Email</h4>
                  <input
                    className="bg-inputBg w-full border-2 border-inputBorder rounded-lg p-3 mt-1 outline-none"
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label htmlFor="password">
                  <h4 className="mt-5">Password</h4>
                  <input
                    className="bg-inputBg w-full border-2 border-inputBorder rounded-lg p-3 mt-1 outline-none"
                    type="Password"
                    placeholder="********"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>

                <p className="mt-10 text-red-700 font-bold text-lg">
                  {error}
                  {loginResponse}
                  {loading && <Spinner />}
                </p>
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
                Don't have an account?
                <Link className="text-blue-700 ml-1 font-bold underline" to="/">
                  Sign up
                </Link>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
