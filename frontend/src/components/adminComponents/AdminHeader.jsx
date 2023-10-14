import React, { useState } from "react";
import { RiLightbulbFlashLine } from "react-icons/ri";
import AdminHomePage from "./adminHomePage";

const AdminHeader = () => {
  const [content, setContent] = useState("Dashboard");
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");

  const changeContent = (newContent) => {
    setActiveMenuItem(newContent);
    setContent(newContent);
  };

  return (
    <>
      <div className="h-8 bg-gray-800"></div>
      <div className="flex">
        <div className="w-1/5 bg-gray-800 h-screen">
          <div className="p-4 text-white">
            <div className="flex items-center mb-4">
              <RiLightbulbFlashLine className="text-white text-2xl" />
              <h1 className="text-2xl font-bold">Skillify</h1>
              <span className="text-sm text-white p-3 ml-2">Admin</span>
            </div>
            {/* Search Bar */}

            <ul className="mt-4">
              <li
                className={`py-2 hover:bg-gray-700 block pl-4  ${
                  activeMenuItem === "Dashboard" ? "bg-gray-700" : ""
                }`}
                onClick={() => changeContent("Dashboard")}
              >
                DashBoard
              </li>
              <li
                className={`py-2 hover:bg-gray-700 block pl-4  ${
                  activeMenuItem === "users" ? "bg-gray-700" : ""
                }`}
                onClick={() => changeContent("users")}
              >
                Users
              </li>
              <li
                className={`py-2 hover:bg-gray-700 block pl-4  ${
                  activeMenuItem === "tutor" ? "bg-gray-700" : ""
                }`}
                onClick={() => changeContent("tutor")}
              >
                Tutors
              </li>
            </ul>
          </div>
        </div>
        <div className="w-4/5 bg-gray-200 h-screen">
          <div className="p-4">
            {content === "Dashboard" && <AdminHomePage />}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
