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
      {!isAdminlogin &&
        (isAdminRoute ? "" : <Header isLoginTutor={isLoginTutor} />)}

      <Outlet />
      <Footer />
    </>
  );
};

export default App;
