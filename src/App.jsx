import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./custom-stream.css"
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
import MeetingPage from "./pages/MeetingPage.jsx";

// ✅ Stream SDK
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";

// ✅ Light theme object for Stream UI
const lightTheme = {
  colors: {
    primary: "#1D4ED8", // Blue
    background: "#ffffff", // Page background
    surface: "#f9f9f9", // Cards, modals, panels
    textHighEmphasis: "#111111", // Main text
    textLowEmphasis: "#555555", // Secondary text
    border: "#e5e5e5", // Divider lines
    danger: "#dc2626", // Errors
    success: "#16a34a", // Success states
    interactive: "#2563eb", // Buttons / active controls
  },
};

const AppWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [rehydrated, setRehydrated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");

    if (token && storedUser) {
      dispatch(
        login({
          user: JSON.parse(storedUser),
          token: token,
        })
      );
    }
    setRehydrated(true);
  }, [dispatch]);

  useEffect(() => {
    if (!rehydrated) return;

    if (user) {
      if (["/", "/login", "/register", "/signup"].includes(location.pathname)) {
        navigate("/dashboard", { replace: true });
      }
    } else {
      if (["/dashboard", "/profile"].includes(location.pathname)) {
        navigate("/login", { replace: true });
      }
    }
  }, [user, location.pathname, navigate, rehydrated]);

  const hideNavbarFooterRoutes = [
    "whiteboard",
    "login",
    "signup",
    "register",
    "notfound",
    "verify-email",
    "meetings",
  ];

  const shouldHideNavbarFooter = hideNavbarFooterRoutes.includes(
    location.pathname.split("/")[1]
  );

  if (!rehydrated) {
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
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/dashboard/*"
          element={
            <StreamVideoProvider>
              <Routes>
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </StreamVideoProvider>
          }
        />
        <Route
          path="/meetings/*"
          element={
            <StreamVideoProvider>
              <Routes>
                <Route
                  path="/:id"
                  element={
                    // ✅ Light themed StreamCall wrapper
                    <StreamTheme theme={lightTheme}>
                      <StreamCall>
                        <MeetingPage />
                      </StreamCall>
                    </StreamTheme>
                  }
                />
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
