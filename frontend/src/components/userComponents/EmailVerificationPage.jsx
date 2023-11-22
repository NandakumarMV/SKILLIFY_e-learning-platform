import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGenerateOtpMutation } from "../../slices/userApiSlice";

const EmailVerificationPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [generateOtp] = useGenerateOtpMutation();
  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await generateOtp({ email });
    navigate(`/otp/${email}`);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="mb-36">
        <div className="text-black text-center underline underline-offset-8 mb-4 text-2xl font-semibold">
          Enter Your Registered Email Id
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
          <button
            type="submit"
            className="bg-black text-white py-2 px-4   hover:bg-white hover:text-black hover:border-2 hover:border-black transition duration-300"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
