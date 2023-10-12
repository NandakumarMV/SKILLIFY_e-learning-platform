import React from "react";
import Header from "./components/userComponents/Header.jsx";
import { Outlet, useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();

  const isLoginAdmin = location.pathname.includes("admin");
  return (
    <>
      <Header isLoginAdmin={isLoginAdmin} />
      <Outlet />
    </>
  );
};

export default App;
