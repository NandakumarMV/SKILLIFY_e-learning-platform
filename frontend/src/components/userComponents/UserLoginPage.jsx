import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useGoogleLoginMutation,
  useLoginMutation,
} from "../../slices/userApiSlice";
import { setCredentials } from "../../slices/userAuthSlice";
import { GoogleLogin } from "@react-oauth/google";

const UserLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();
  const [googleLogin] = useGoogleLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const googleSubmitHandler = async (value) => {
    try {
      const res = await googleLogin({ token: value }).unwrap();
      dispatch(
        setCredentials({
          ...res,
        })
      );
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(
        setCredentials({
          ...res,
        })
      );
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="mb-36">
        <div className="text-black text-center mb-4 text-2xl font-semibold">
          Login with your Skillify account
        </div>
        <form className="p-6  w-96 " onSubmit={(e) => submitHandler(e)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-blue-900- font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              className="w-full border border-gray-600  px-3 py-2"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-blue-900- font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-600  px-3 py-2"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white py-2 px-4  hover:bg-white hover:text-black hover:border-2 hover:border-black transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="border-t-[1px] border-black p-5">
          <div className="flex  justify-center items-center">
            <GoogleLogin
              clientId="646376613853-opi07m71f0glecaf3lhj5iet07c27aff.apps.googleusercontent.com"
              onSuccess={(response) => {
                googleSubmitHandler(response.credential);
              }}
              onFailure={(error) => console.log("Google login failed", error)}
              render={(renderProps) => (
                <button
                  type="button"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="bg-blue-700 text-white py-2 px-4 hover:bg-blue-600 hover:text-white hover:border-2 hover:border-blue-700 transition duration-300"
                >
                  Login with Google
                </button>
              )}
            />
          </div>
        </div>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <p className="ml-32">
          don't have an account?
          <Link to="/signup" className="text-blue-600">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserLoginPage;
