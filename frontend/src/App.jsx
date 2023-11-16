import React from "react";
import Header from "./components/userComponents/Header.jsx";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/userComponents/Footer.jsx";

const App = () => {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAdminlogin = location.pathname.includes("/admin/login");
  const isLoginTutor = location.pathname.includes("tutor");
  return (
    <>
      <div className="min-h-screen flex flex-col overflow-x-hidden ">
        {!isAdminlogin &&
          (isAdminRoute ? "" : <Header isLoginTutor={isLoginTutor} />)}
        <div className="flex-grow">
          <Outlet />
        </div>
        {isAdminRoute ? "" : <Footer />}
      </div>
    </>
  );
};

export default App;
