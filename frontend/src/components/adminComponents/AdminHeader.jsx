import React, { useState } from "react";
import { RiLightbulbFlashLine } from "react-icons/ri";
import AdminHomePage from "./adminHomePage";
import UsersList from "./UsersList";

const AdminHeader = () => {
  const [content, setContent] = useState("Dashboard");
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");

  const changeContent = (newContent) => {
    setActiveMenuItem(newContent);
    setContent(newContent);
  };

  return (
    <>
      <div className="h-12 bg-gray-800">
        <div className="flex items-center mb-4 pt-2">
          <RiLightbulbFlashLine className="text-white text-2xl ml-4" />
          <h1 className="text-2xl text-white font-bold pt-1 pl-2">Skillify</h1>
          <span className="text-sm text-white p-1 ml-2 pt-2">Admin</span>
          <h1 className="text-white text-lg pl-40 pt-2">
            {content.toUpperCase()}
          </h1>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/5 bg-gray-800 h-screen">
          <div className="p-4 text-white">
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
            {content === "users" && <UsersList />}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
