import React from "react";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import Dropdown from "./DropDown";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <header className="relative ">
      <div className="bg-white-500 p-4 shadow-2xl sticky top-0 ">
        <div className="container mx-auto">
          <div className="flex justify-between items-center p-1">
            <div className="flex items-center space-x-.5">
              <RiLightbulbFlashLine className="text-black text-2xl mb-2" />
              <div className="text-black font-semibold text-xl pb-2">
                SKILLIFY
              </div>
            </div>
            <div className="mr-2">
              <p className="text-sm">Welcome {userInfo?.name}</p>
            </div>
            <ul className="flex space-x-10">
              <li className="text-black hover:text-blue-600 cursor-pointer">
                <Link to="/courses">Courses</Link>
              </li>
              <li className="text-black hover:text-blue-600 cursor-pointer">
                <a href="">Teach with us</a>
              </li>
              {userInfo ? (
                <>
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
              ) : (
                <>
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
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
