import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useVerifyOtpMutation } from "../../slices/userApiSlice";
import { VscVerifiedFilled } from "react-icons/vsc";

const OtpPage = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const [verifyOtp] = useVerifyOtpMutation();
  const [err, setErr] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleModalButtonClick = () => {
    setShowModal(false);
    navigate(`/`);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await verifyOtp({ email, otp }).unwrap();
      if (location.state && location.state.from === "/signup") {
        setShowModal(true); // Show modal if previous route is /signup
      } else {
        navigate(`/reset-password/${email}`);
      }
    } catch (error) {
      setErr("Incorrect otp");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <div className="mb-36">
          <div className="text-black text-center underline underline-offset-8 mb-4 text-2xl font-semibold">
            Enter the OTP
          </div>
          <form className="p-6 w-96" onSubmit={(e) => submitHandler(e)}>
            <input type="hidden" value={email} name="email"></input>
            <div className="mb-4">
              <label
                htmlFor="otp"
                className={
                  err
                    ? "block text-red-600 font-semibold text-lg"
                    : "block text-blue-900 font-semibold"
                }
              >
                {err ? err : "OTP"}
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                name="otp"
                className="w-full border border-gray-600 px-3 py-2"
                placeholder="Enter Otp"
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white py-2 px-4 hover:bg-white hover:text-black hover:border-2 hover:border-black transition duration-300"
            >
              Confirm
            </button>
          </form>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-slate-200 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-xl w-1/3 flex flex-col justify-center items-center">
            <p className="text-xl mb-4 text-green-600">
              Thanks! Your account has be verified
            </p>
            <div className="text-blue-600">
              <VscVerifiedFilled className="h-20 w-20" />
            </div>
            <div className=" w-full mt-9">
              <Link to="/">
                <button className="bg-blue-500 text-white py-2 px-4 rounded w-full ">
                  Go to Home Page
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OtpPage;
