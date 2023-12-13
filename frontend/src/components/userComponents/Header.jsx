import React, { useState } from "react";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { AiFillHeart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "./DropDown";
import SearchBarComponent from "./SearchBarComponent";
import { useTutorlogoutMutation } from "../../slices/tutorApiSlice";
import { tutorLogout } from "../../slices/tutorAuthSlice";
import TutorDropdown from "../tutorComponents/TutorDropdown";
import { useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useLogoutMutation } from "../../slices/userApiSlice";

const Header = ({ isLoginTutor }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { tutorInfo } = useSelector((state) => state.tutorAuth);
  const [isOpen, setIsOpen] = useState(false);

  const [logoutApi] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const location = useLocation();
  const isWishlistRoute = location.pathname === "/wishlist";
  return (
    <header className="relative w-screen  drop-shadow-lg z-30">
      <div className="bg-white-500 p-4 sm:p-2  bg-slate-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-0.5">
              <RiLightbulbFlashLine className="text-2xl mb-2 sm:text-3xl" />
              <div className="text-xl pb-2 sm:text-2xl">
                {userInfo ? <Link to="/">SKILLIFY</Link> : "Skillify"}
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
              <div className="text-sm sm:text-base hidden md:flex flex-grow justify-center space-x-4">
                {isLoginTutor ? (
                  <p>Welcome {tutorInfo?.name.toUpperCase()}</p>
                ) : userInfo ? (
                  <p>Welcome {userInfo?.name.toUpperCase()}</p>
                ) : null}
              </div>
            </div>
            {userInfo && !isLoginTutor && !isWishlistRoute && (
              <div>
                <SearchBarComponent />
              </div>
            )}

            <ul className="flex space-x-2 sm:space-x-10">
              {isLoginTutor ? (
                <>
                  {tutorInfo && (
                    <>
                      <li className="text-sm sm:text-base hidden md:flex flex-grow justify-center space-x-4">
                        <Link to="/tutor/add-course"> Add New Course</Link>
                      </li>
                      <li className="text-sm sm:text-base hidden md:flex flex-grow justify-center space-x-4">
                        <Link to="/tutor/courses">My Courses</Link>
                      </li>{" "}
                      <li className="text-sm sm:text-base hidden md:flex flex-grow justify-center space-x-4">
                        <Link to="/tutor/messages">Messages</Link>
                      </li>
                      <li className="text-sm sm:text-base hidden md:flex flex-grow justify-center space-x-4">
                        <Link to="/tutor/dashboard">Dashboard</Link>
                      </li>
                      <li className="">
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
                          <li className="text-sm sm:text-base hidden md:flex flex-grow justify-center space-x-4 ">
                            <Link to={`/user-messages/allChats`}>Messages</Link>
                          </li>
                          <li className="text-sm sm:text-base hidden md:flex flex-grow justify-center space-x-4">
                            <Link to="/courses">Courses</Link>
                          </li>
                          <li className="text-sm sm:text-base hidden md:flex flex-grow justify-center space-x-4">
                            <Link to="/my-learning">My Courses</Link>
                          </li>
                          <li className="text-sm sm:text-base hidden md:flex flex-grow justify-center space-x-4">
                            <Link to="/wishlist">
                              <AiFillHeart className="h-9 w-6 pb-2" />
                            </Link>
                          </li>
                          <li className="text-sm sm:text-base hidden md:flex flex-grow justify-center space-x-4">
                            <Dropdown />
                          </li>
                          <button
                            onClick={toggleMenu}
                            className="md:hidden text-black focus:outline-none"
                          >
                            <GiHamburgerMenu />
                          </button>
                          {isOpen && (
                            <div className="md:hidden absolute top-16 right-4 left-4 bg-slate-100 p-2">
                              <ul className="space-y-2">
                                <li>
                                  <Link
                                    to={`/user-messages/allChats`}
                                    className="text-balck hover:text-blue-800 w-full block"
                                  >
                                    Messages
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/courses"
                                    className="text-balck hover:text-blue-800 w-full block"
                                  >
                                    Courses
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/my-learning"
                                    className="text-balck hover:text-blue-800 w-full block"
                                  >
                                    My Courses
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/wishlist"
                                    className="text-balck hover:text-blue-800 w-full block"
                                  >
                                    WishList
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/profile"
                                    className="text-balck hover:text-blue-800 w-full block"
                                  >
                                    Profile
                                  </Link>
                                </li>{" "}
                                <li>
                                  <Link
                                    onClick={handleLogout}
                                    className="text-balck hover:text-blue-800 w-full block"
                                  >
                                    Logout
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {!isLoginTutor && (
                        <>
                          <li className="text-sm sm:text-base hidden md:flex flex-grow justify-center space-x-4">
                            <Link to="/tutor/login">Teach with US</Link>
                          </li>
                          <li className="text-sm sm:text-base hidden md:flex flex-grow justify-center space-x-4">
                            <Link to="/login">Courses</Link>
                          </li>
                          <li>
                            <Link to="/login">
                              <button className="border-2 border-black text-sm sm:text-base hidden md:flex flex-grow justify-center space-x-4 p-1 px-2 ml-1 hover:bg-black hover:text-white">
                                Login
                              </button>
                            </Link>
                          </li>
                          <li>
                            <Link to="/signup">
                              <button className="border-2 border-black text-sm sm:text-base hidden md:flex flex-grow justify-center space-x-4 p-1 px-2 ml-1 hover:bg-black hover:text-white">
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
