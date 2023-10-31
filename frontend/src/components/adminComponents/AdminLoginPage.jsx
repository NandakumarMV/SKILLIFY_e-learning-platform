import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAdminLoginMutation } from "../../slices/adminApiSlice";

import { setAdminCredentials } from "../../slices/adminAuthSlice";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [adminLogin] = useAdminLoginMutation();
  const { adminInfo } = useSelector((state) => state.adminAuth);

  useEffect(() => {
    if (adminInfo) {
      navigate("/admin");
    }
  }, [navigate, adminInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await adminLogin({ email, password }).unwrap();
      dispatch(
        setAdminCredentials({
          ...res,
        })
      );
      navigate("/admin");
    } catch (err) {}
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="mb-36">
        <div className="text-black text-center mb-4 text-2xl font-semibold">
          Login with Skillify Admin account
        </div>
        <form className="p-6  w-96 " onSubmit={submitHandler}>
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

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      </div>
    </div>
  );
};

export default AdminLoginPage;
