import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTutorLoginMutation } from "../../slices/tutorApiSlice";
import { setTutorCredentials } from "../../slices/tutorAuthSlice";

const TutorLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [tutorLogin] = useTutorLoginMutation();

  const { tutorInfo } = useSelector((state) => state.tutorAuth);

  useEffect(() => {
    if (tutorInfo) {
      navigate("/tutor/home");
    }
  }, [navigate, tutorInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await tutorLogin({ email, password }).unwrap();
      dispatch(
        setTutorCredentials({
          ...res,
        })
      );
      navigate("/tutor/home");
    } catch (err) {
      setError("Invalid email or password");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="mb-36">
        <div className="text-black text-center mb-4 text-2xl font-semibold">
          let's Teach with Skillify,Login to your account
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

        <p className="ml-32">
          don't have an account?
          <Link to="/tutor/signup" className="text-blue-600">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default TutorLoginPage;
