import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/userAuthSlice";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfrimPassword] = useState("");
  const [error, setError] = useState("");

  const [register] = useRegisterMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Password not matching");
    } else {
      try {
        console.log("reached here");

        const res = await register({ name, email, password }).unwrap();

        console.log(res);
        dispatch(
          setCredentials({
            ...res,
          })
        );
        navigate("/");
      } catch (error) {
        setError(error?.data?.message || error.error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="">
        <div className="text-black text-center mb-4 text-2xl font-semibold">
          Welcome, Let's create your Skillify account
        </div>
        <form className="p-6  w-96 " onSubmit={submitHandler}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-blue-900- font-semibold"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              className="w-full border border-gray-600  px-3 py-2"
              placeholder="Enter your name"
            />
          </div>
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
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              className="w-full border border-gray-600  px-3 py-2"
              placeholder="Enter your password"
            />
          </div>
          {error === "Password not matching" && (
            <div className="text-red-500 text-right mb-4">{error}</div>
          )}

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-blue-900- font-semibold"
            >
              Confrim Password
            </label>
            <input
              type="password"
              id="confrimPassword"
              name="confrimPassword"
              value={confirmPassword}
              onChange={(e) => setConfrimPassword(e.target.value)}
              className="w-full border border-gray-600  px-3 py-2"
              placeholder="Confrim your password"
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white py-2 px-4  hover:bg-white hover:text-black hover:border-2 hover:border-black transition duration-300"
          >
            Sign Up
          </button>
        </form>
        {error !== "Password not matching" && (
          <div className="text-red-500 text-right mb-4">{error}</div>
        )}

        <p className="ml-32">
          Already have an account?
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
