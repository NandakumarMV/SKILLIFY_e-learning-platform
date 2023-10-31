import React from "react";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { AiFillHeart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "./DropDown";

import { useTutorlogoutMutation } from "../../slices/tutorApiSlice";
import { tutorLogout } from "../../slices/tutorAuthSlice";
import TutorDropdown from "../tutorComponents/TutorDropdown";

const Header = ({ isLoginTutor }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { tutorInfo } = useSelector((state) => state.tutorAuth);

  const [logoutTutor] = useTutorlogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    try {
      await logoutTutor().unwrap();
      dispatch(tutorLogout);
      navigate("/tutor/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="relative">
      <div className="bg-white-500 p-4 sm:p-2 shadow-2xl w-screen">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-0.5">
              <RiLightbulbFlashLine className="text-2xl mb-2 sm:text-3xl" />
              <div className="text-xl pb-2 sm:text-2xl">
                SKILLIFY
                {isLoginTutor && (
                  <Link to="/tutor/home">
                    <span className="text-gray-600 font-normal text-sm ml-2">
                      Lets teach with Us!
                    </span>
                  </Link>
                )}
              </div>
            </div>
            <div className="mr-2">
              <div className="text-sm sm:text-base">
                {isLoginTutor ? (
                  <p>Welcome {tutorInfo?.name.toUpperCase()}</p>
                ) : userInfo ? (
                  <p>Welcome {userInfo?.name.toUpperCase()}</p>
                ) : null}
              </div>
            </div>
            <ul className="flex space-x-2 sm:space-x-10">
              {isLoginTutor ? (
                <>
                  {tutorInfo && (
                    <>
                      <li className="text-sm sm:text-base">
                        <Link to="/tutor/add-course"> Add courses</Link>
                      </li>
                      <li className="text-sm sm:text-base">
                        <a href=""></a>
                      </li>
                      <li className="text-sm sm:text-base">
                        <a href="">Dashboard</a>
                      </li>
                      <li>
                        <TutorDropdown />
                      </li>
                    </>
                  )}
                </>
              ) : (
                <>
                  {userInfo ? (
                    <>
                      {" "}
                      {!isLoginTutor && (
                        <>
                          <li className="text-sm sm:text-base">
                            <Link to="/tutor/login">Teach with US</Link>
                          </li>
                          <li className="text-sm sm:text-base">
                            <Link>Courses</Link>
                          </li>
                          <li className="text-sm sm:text-base">
                            <a href="">My Courses</a>
                          </li>
                          <li className="text-sm sm:text-base">
                            <a href="">
                              <AiFillHeart className="h-9 w-6 pb-2" />
                            </a>
                          </li>
                          <li className="text-sm sm:text-base">
                            <Dropdown />
                          </li>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {!isLoginTutor && (
                        <>
                          <li className="text-sm sm:text-base">
                            <Link to="/tutor/login">Teach with US</Link>
                          </li>
                          <li className="text-sm sm:text-base">
                            <Link>Courses</Link>
                          </li>
                          <li>
                            <Link to="/login">
                              <button className="border-2 border-black text-sm sm:text-base p-1 px-2 ml-1 hover:bg-black hover:text-white">
                                Login
                              </button>
                            </Link>
                          </li>
                          <li>
                            <Link to="/signup">
                              <button className="border-2 border-black text-sm sm:text-base p-1 px-2 ml-1 hover:bg-black hover:text-white">
                                Sign Up
                              </button>
                            </Link>
                          </li>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
