import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVerifyOtpMutation } from "../../slices/userApiSlice";

const OtpPage = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const [verifyOtp] = useVerifyOtpMutation();
  const [err, seterr] = useState(null);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await verifyOtp({ email, otp }).unwrap();
      // navigate(`/reset-password/${email}`);
      navigate(`/reset-password/${email}`);
    } catch (error) {
      seterr("Incorrect otp");
    }
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden ">
        <div className="mb-36">
          <div className="text-black text-center underline underline-offset-8 mb-4 text-2xl font-semibold">
            Enter the OTP
          </div>
          <form className="p-6  w-96 " onSubmit={(e) => submitHandler(e)}>
            <input type="hidden" value={email} name="email"></input>
            <div className="mb-4">
              <label
                htmlFor="otp"
                className="block text-blue-900- font-semibold"
              >
                OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                name="otp"
                className="w-full border border-gray-600  px-3 py-2"
                placeholder="Enter Otp"
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
    </div>
  );
};

export default OtpPage;
