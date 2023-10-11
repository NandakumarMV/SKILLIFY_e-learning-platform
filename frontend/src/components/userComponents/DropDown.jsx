import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../slices/userAuthSlice";
import { useLogoutMutation } from "../../slices/userApiSlice";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
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

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="text-black hover:text-blue-600 cursor-pointer"
      >
        <FaUserCircle className="h-9 w-6 pb-2" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 rounded-md hover:shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <Link to="/profile">
              <button
                className="block px-2 py-2 text-base text-black hover:text-blue-600"
                role="menuitem"
              >
                Profile
              </button>
            </Link>

            <button
              onClick={handleLogout}
              className=" px-2 py-2 flex items-center text-base text-black hover:text-red-600"
              role="menuitem"
            >
              Logout
              <BiLogOut className="ml-2" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
