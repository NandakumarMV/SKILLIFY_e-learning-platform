import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../slices/userApiSlice";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  const [password, setPassword] = useState("");
  const [err, seterr] = useState(null);

  const [confirmPassword, setConfrimPassword] = useState("");
  const [resetpassword] = useResetPasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      seterr("Password not Matching");
    }
    const res = await resetpassword({ password, email });
    navigate("/login");
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden ">
        <div className="mb-36">
          <div className="text-black text-center underline underline-offset-8 mb-4 text-2xl font-semibold">
            Reset Your Password
          </div>
          <form className="p-6  w-96 " onSubmit={submitHandler}>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-blue-900- font-semibold"
              >
                Password
              </label>
              <input
                type="number"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                className="w-full border border-gray-600  px-3 py-2"
                placeholder="Enter Password"
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

export default ResetPasswordPage;
