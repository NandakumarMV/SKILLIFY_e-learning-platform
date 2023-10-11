import React from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="">
        <div className="text-black text-center mb-4 text-2xl font-semibold">
          Welcome, Let's create your Skillify account
        </div>
        <form className="p-6  w-96 ">
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
              name="password"
              className="w-full border border-gray-600  px-3 py-2"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-blue-900- font-semibold"
            >
              Confrim Password
            </label>
            <input
              type="password"
              id="password"
              name="confrimPassword"
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
        <p className="ml-32">
          Already have an account?
          <Link to="/" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;