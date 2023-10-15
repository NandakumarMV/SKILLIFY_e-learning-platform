import React from "react";
import Header from "./components/userComponents/Header.jsx";
import { Outlet, useLocation } from "react-router-dom";
import AdminHeader from "./components/adminComponents/AdminHeader.jsx";

const App = () => {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAdminlogin = location.pathname.includes("/admin/login");
  const isLoginTutor = location.pathname.includes("tutor");
  return (
    <>
      {!isAdminlogin &&
        (isAdminRoute ? (
          <AdminHeader />
        ) : (
          <Header isLoginTutor={isLoginTutor} />
        ))}

      <Outlet />
    </>
  );
};

export default App;
