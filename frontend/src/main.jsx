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
import UserLoginPage from "./components/userComponents/UserLoginPage.jsx";
import SignupPage from "./components/userComponents/SignupPage.jsx";
import HomePage from "./components/userComponents/HomePage.jsx";
0;
import AdminLoginPage from "./components/adminComponents/adminLoginPage.jsx";

import TutorLoginPage from "./components/tutorComponents/TutorLoginPage.jsx";
import TutorHome from "./components/tutorComponents/TutorHome.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AdminHeader from "./components/adminComponents/AdminHeader.jsx";
import AdminPrivateRoute from "./components/adminComponents/AdminPrivateRoute.jsx";
import TutorSignupPage from "./components/tutorComponents/TutorSignupPage.jsx";
import UserProfile from "./components/userComponents/UserProfile.jsx";
import TutorProfile from "./components/tutorComponents/TutorProfile.jsx";
import AddCourse from "./components/tutorComponents/AddCourse.jsx";
import AllCoursesPage from "./components/tutorComponents/AllCoursesPage.jsx";
import SingleCourse from "./components/userComponents/SingleCourse.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/************User side routes ***************/}

      <Route index={true} path="/" element={<HomePage />} />
      <Route
        path="/login"
        element={<UserLoginPage />}
        errorElement={<UserLoginPage />}
      />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/course/:courseId" element={<SingleCourse />} />

      {/************Admin side routes ***************/}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="" element={<AdminPrivateRoute />}>
        <Route index={true} path="/admin" element={<AdminHeader />} />
      </Route>

      {/************tutor side routes ***************/}

      <Route path="/tutor/login" element={<TutorLoginPage />} />
      <Route path="/tutor/signup" element={<TutorSignupPage />} />
      <Route path="/tutor/home" element={<TutorHome />} />
      <Route path="/tutor/add-course" element={<AddCourse />} />
      <Route path="/tutor/profile" element={<TutorProfile />} />
      <Route path="/tutor/courses" element={<AllCoursesPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <GoogleOAuthProvider clientId="646376613853-opi07m71f0glecaf3lhj5iet07c27aff.apps.googleusercontent.com">
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </React.StrictMode>
  </Provider>
);
