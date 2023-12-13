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
import OrderPage from "./components/userComponents/OrderPage.jsx";
import MyLearningPage from "./components/userComponents/MyLearningPage.jsx";

import CoursesViewPage from "./components/userComponents/CoursesViewPage.jsx";
import WishList from "./components/userComponents/WishList.jsx";
import EmailVerificationPage from "./components/userComponents/EmailVerificationPage.jsx";
import OtpPage from "./components/userComponents/OtpPage.jsx";
import ResetPasswordPage from "./components/userComponents/ResetPasswordPage.jsx";
import TutorView from "./components/userComponents/TutorView.jsx";
import Messages from "./components/userComponents/Messages.jsx";
import TutorMessages from "./components/tutorComponents/TutorMessages.jsx";
import LiveStream from "./components/LiveStream.jsx";
import TutorDashboard from "./components/tutorComponents/TutorDashboard.jsx";
import UserPrivateRoute from "./components/userComponents/userPrivateRoute.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import ErrorPage from "./components/ErrorPage.jsx";

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
      <Route path="/courses" element={<CoursesViewPage />} />
      <Route path="" element={<UserPrivateRoute />}>
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/course/:courseId" element={<SingleCourse />} />
        <Route path="/order/:courseId" element={<OrderPage />} />
        <Route path="/my-learning" element={<MyLearningPage />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/enter-email" element={<EmailVerificationPage />} />
        <Route path="/otp/:email" element={<OtpPage />} />
        <Route path="/reset-password/:email" element={<ResetPasswordPage />} />
        <Route path="/tutor-profile/:tutorId" element={<TutorView />} />
        <Route path="/user-messages/:chatId" element={<Messages />} />
        <Route path="/get-live/:randomId" element={<LiveStream />} />
      </Route>
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
      <Route path="/tutor/messages" element={<TutorMessages />} />
      <Route path="/tutor/dashboard" element={<TutorDashboard />} />
      <Route path="*" element={<ErrorPage />} />
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
