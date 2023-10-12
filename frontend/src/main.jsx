import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import LoginPage from "./components/userComponents/LoginPage.jsx";
import SignupPage from "./components/userComponents/SignupPage.jsx";
import HomePage from "./components/userComponents/HomePage.jsx";
import AdminLoginPage from "./components/adminComponents/adminLoginPage.jsx";
import AdminHomePage from "./components/adminComponents/adminHomePage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/************User side routes ***************/}

      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/************Admin side routes ***************/}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route index={true} path="/admin" element={<AdminHomePage />} />
      <Route path="/admin/logout" element={<AdminLoginPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
