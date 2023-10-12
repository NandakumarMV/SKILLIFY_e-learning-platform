import React from "react";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { AiFillHeart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "./DropDown";
import { useAdminLogoutMutation } from "../../slices/adminApiSlice";
import { adminLogout } from "../../slices/adminAuthSlice";

const Header = ({ isLoginAdmin }) => {
  const { userInfo } = useSelector((state) => state.auth);

  const { adminInfo } = useSelector((state) => state.adminAuth);
  const [LogoutAdmin] = useAdminLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    try {
      await LogoutAdmin().unwrap();
      dispatch(adminLogout());
      navigate("/admin/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="relative">
      <div className="bg-white-500 p-4 shadow-2xl sticky top-0">
        <div className="container mx-auto">
          <div className="flex justify-between items-center p-1">
            <div className="flex items-center space-x-.5">
              <RiLightbulbFlashLine className="text-black text-2xl mb-2" />
              <div className="text-black font-semibold text-xl pb-2">
                SKILLIFY
                {isLoginAdmin && (
                  <span className="text-gray-600 font-normal text-sm ml-2">
                    Admin Login
                  </span>
                )}
              </div>
            </div>
            <div className="mr-2">
              <div className="text-sm">
                {isLoginAdmin ? (
                  ""
                ) : userInfo ? (
                  <p>Welcome {userInfo?.name}</p>
                ) : null}
              </div>
            </div>
            <ul className="flex space-x-10">
              {isLoginAdmin ? (
                <>
                  {adminInfo && (
                    <>
                      <li className="text-black hover:text-blue-600 cursor-pointer">
                        <Link>Users</Link>
                      </li>
                      <li className="text-black hover:text-blue-600 cursor-pointer">
                        <a href="">Tutors</a>
                      </li>
                      <li className="text-black hover:text-blue-600 cursor-pointer">
                        <a href="">courses</a>
                      </li>
                      <li
                        className="text-black hover:text-red-600 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    </>
                  )}
                </>
              ) : (
                <>
                  {userInfo ? (
                    <>
                      {" "}
                      {!isLoginAdmin && (
                        <>
                          <li className="text-black hover:text-blue-600 cursor-pointer">
                            <Link>Teach with US</Link>
                          </li>
                          <li className="text-black hover:text-blue-600 cursor-pointer">
                            <Link>Courses</Link>
                          </li>
                          <li className="text-black hover:text-blue-600 cursor-pointer">
                            <a href="">My Courses</a>
                          </li>
                          <li className="text-black hover:text-blue-600 cursor-pointer">
                            <a href="">
                              <AiFillHeart className="h-9 w-6 pb-2" />
                            </a>
                          </li>
                          <li className="text-black hover:text-blue-600 cursor-pointer">
                            <Dropdown />
                          </li>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {!isLoginAdmin && (
                        <>
                          <li className="text-black hover:text-blue-600 cursor-pointer">
                            <Link>Teach with US</Link>
                          </li>
                          <li className="text-black hover:text-blue-600 cursor-pointer">
                            <Link>Courses</Link>
                          </li>
                          <li>
                            <Link to="/login">
                              <button className="border-2 border-black text-black text-sm p-1 px-2 ml-1 hover:bg-black hover:text-white">
                                Login
                              </button>
                            </Link>
                          </li>
                          <li>
                            <Link to="/signup">
                              <button className="border-2 border-black text-black text-sm p-1 px-2 ml-1 hover:bg-black hover:text-white">
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
