import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";

import AboutPage from "./pages/AboutPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WhiteBoard from "./components/WhiteBoard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import NotFoundPage from "./pages/NotFoundPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/resetPassword/[token].jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { login } from "./features/authSlice";
import AuthSuccess from "./pages/AuthSuccess.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import VerifyEmailPage from "./pages/VerifyEmailPage.jsx";

import { useSelector, useDispatch } from "react-redux";
import StreamVideoProvider from "./providers/StreamVideoProvider.jsx";
import MeetingRoom from "./components/MeetingRoom.jsx";

const AppWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [rehydrated, setRehydrated] = useState(false);

  // Load user from localStorage once
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("authUser");

    if (token && user) {
      dispatch(
        login({
          user: JSON.parse(user),
          token: token,
        })
      );
    }
    setRehydrated(true);
  }, [dispatch]);

  // Redirect logic after rehydration
  useEffect(() => {
    if (!rehydrated) return;

    if (user) {
      // Redirect logged-in users away from landing/login/register
      if (["/", "/login", "/register", "/signup"].includes(location.pathname)) {
        navigate("/dashboard", { replace: true });
      }
    } else {
      // Redirect non-logged-in users away from protected pages
      if (["/dashboard", "/profile"].includes(location.pathname)) {
        navigate("/login", { replace: true });
      }
    }
  }, [user, location.pathname, navigate, rehydrated]);

  // Routes where Navbar/Footer should be hidden
  const hideNavbarFooterRoutes = ["/whiteboard", "/login", "/signup", "/register", "/notfound", "/verify-email"];
  const shouldHideNavbarFooter = hideNavbarFooterRoutes.includes(location.pathname);

  if (!rehydrated) {
    // Optional: show a loader while state is being rehydrated
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      {!shouldHideNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/whiteboard" element={<WhiteBoard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* Corrected route for Reset Password */}
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* New route for Email Verification */}
        <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/meetings/*"
          element={
            <StreamVideoProvider>
              <Routes>
                <Route path="/:meetingId" element={<MeetingRoom />} />

        {/* meeting routes */}
              </Routes>
            </StreamVideoProvider>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!shouldHideNavbarFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;
