import React from "react";
import Header from "./components/userComponents/Header.jsx";
import LoginPage from "./components/userComponents/LoginPage.jsx";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;
