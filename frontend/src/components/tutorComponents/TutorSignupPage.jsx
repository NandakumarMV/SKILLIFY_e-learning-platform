import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTutorRegisterMutation } from "../../slices/tutorApiSlice";
import { setTutorCredentials } from "../../slices/tutorAuthSlice";

const TutorSignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfrimPassword] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [qualificationsPdf, setQualificationsPdf] = useState();
  const [passwordError, setPasswordError] = useState("");
  const [experience, setExperience] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tutorRegister] = useTutorRegisterMutation();
  const { tutorInfo } = useSelector((state) => state.tutorAuth);
  useEffect(() => {
    if (tutorInfo) {
      navigate("/tutor/home");
    }
  }, [navigate, tutorInfo]);
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     // console.log(file, "kkkkkkkkkkkkkkkk");
  //     setQualificationsPdf(file);
  //   }
  // };
  const sumbmitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Password not matching");
    } else {
      // if (
      //   !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      //     password
      //   )
      // ) {
      //   setPasswordError(
      //     "Password must contain at least 8 characters,  one number, and one special character"
      //   );
      // } else {
      try {
        const res = await tutorRegister({
          name,
          email,
          password,
          // qualificationsPdf,
          qualifications,
          experience,
        }).unwrap();
        dispatch(
          setTutorCredentials({
            ...res,
          })
        );
        navigate("/tutor/home");
      } catch (error) {
        setError(err?.data?.message || err.error);
      }
      // }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="">
        <div className="text-black text-center mb-4 pt-10 text-2xl font-semibold">
          Welcome, Let's teach with us, Sign Up!
        </div>

        <form
          className="p-6  w-96 "
          encType="multipart/form-data"
          onSubmit={sumbmitHandler}
        >
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
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              name="password"
              className="w-full border border-gray-600  px-3 py-2"
              placeholder="Enter your password"
            />
          </div>{" "}
          {passwordError && (
            <div className="text-red-500 text-right mb-4">{passwordError}</div>
          )}
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
          <div>
            <div className="mb-4">
              <label
                htmlFor="qualifications"
                className="block text-blue-900- font-semibold"
              >
                Highest Qualifications
              </label>
              <select
                id="qualifications"
                name="qualifications"
                value={qualifications}
                onChange={(e) => setQualifications(e.target.value)}
                className="w-full border border-gray-600 px-3 py-2"
              >
                <option value="">Select Qualifications</option>
                <option value="Bachelors">Bachelor's degree</option>
                <option value="Masters">Masters</option>
              </select>
            </div>

            {/* <div className="mb-4">
              <label
                htmlFor="uploadqualifications"
                className="block text-blue-900- font-semibold"
              >
                Upload Qualifications (PDF only)
              </label>
              <input
                type="file"
                id="qualificationsPdf"
                name="qualificationsPdf"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full border border-gray-600 px-3 py-2"
              />
            </div> */}
            <div className="mb-4">
              <label
                htmlFor="workExp"
                className="block text-blue-900- font-semibold"
              >
                Work Experience
              </label>
              <input
                type="text"
                id="workExp"
                name="workExp"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full border border-gray-600  px-3 py-2"
                placeholder="Explain about our Experience"
              />
            </div>
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

        <p className="ml-32 pb-28">
          Already have an account?
          <Link to="/tutor/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default TutorSignupPage;
