import React, { useState } from "react";
import { RiLightbulbFlashLine } from "react-icons/ri";
import AdminHomePage from "./adminHomePage";
import UsersList from "./UsersList";
import TutorList from "./TutorList";
import { useAdminLogoutMutation } from "../../slices/adminApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogout } from "../../slices/adminAuthSlice";
import DomainList from "./DomainList";
import CourseList from "./CourseList";
import Footer from "../userComponents/Footer";

const AdminHeader = () => {
  const [content, setContent] = useState("Dashboard");
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");

  const [logout] = useAdminLogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(adminLogout());
      navigate("/admin/login");
    } catch (err) {
      console.log(err);
    }
  };

  const changeContent = (newContent) => {
    setActiveMenuItem(newContent);
    setContent(newContent);
  };

  return (
    <>
      <div className="  flex flex-col ">
        <div className="h-12 bg-gray-800">
          <div className="flex items-center mb-4 pt-2">
            <RiLightbulbFlashLine className="text-white text-2xl ml-4" />
            <h1 className="text-2xl text-white font-bold pt-1 pl-2">
              Skillify
            </h1>
            <span className="text-sm text-white p-1 ml-2 pt-2">Admin</span>
            <h1 className="text-white text-lg pl-40 pt-2">
              {content.toUpperCase()}
            </h1>
          </div>
        </div>
        <div className="flex  ">
          <div className="w-1/5 bg-gray-800 ">
            <div className="p-4 text-white h-screen">
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
                  onClick={() => changeContent("tutors")}
                >
                  Tutors
                </li>
                <li
                  className={`py-2 hover:bg-gray-700 block pl-4  ${
                    activeMenuItem === "domain" ? "bg-gray-700" : ""
                  }`}
                  onClick={() => changeContent("domain")}
                >
                  Domains
                </li>
                <li
                  className={`py-2 hover:bg-gray-700 block pl-4  ${
                    activeMenuItem === "courses" ? "bg-gray-700" : ""
                  }`}
                  onClick={() => changeContent("courses")}
                >
                  Courses
                </li>
                <li
                  className="py-2 hover:bg-gray-700 block pl-4  "
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
          <div className="w-4/5 bg-gray-200 ">
            <div className="p-4">
              {content === "Dashboard" && <AdminHomePage />}
              {content === "users" && <UsersList />}
              {content === "tutors" && <TutorList />}
              {content === "domain" && <DomainList />}
              {content === "courses" && <CourseList />}
            </div>
          </div>
        </div>
        {/* <div className="flex flex-col ">
          <Footer />
        </div>{" "} */}
      </div>
    </>
  );
};

export default AdminHeader;
