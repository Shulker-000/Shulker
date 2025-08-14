import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import AboutPage from './pages/AboutPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WhiteBoard from './components/WhiteBoard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import NotFoundPage from './pages/NotFoundPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/resetPassword/[token]';
import Dashboard from './pages/Dashboard.jsx';
import { useDispatch } from 'react-redux';
import { login } from './features/authSlice';

const AppWrapper = () => {
  const location = useLocation()
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("authUser");

    if (token && user) {
      dispatch(
        login({
          user: JSON.parse(user), // convert string back to object
          token: token,
        })
      );
    }
  }, [dispatch]);

  // Routes where Navbar should be hidden
  const hideNavbarFooterRoutes = ['/whiteboard', '/login', '/signup', '/register', '/notfound']
  const shouldHideNavbarFooter = hideNavbarFooterRoutes.includes(location.pathname)

  return (
    <>
      {!shouldHideNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/whiteboard" element={<WhiteBoard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/notfound" element={<NotFoundPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to="/notfound" replace />} />
      </Routes>
      {!shouldHideNavbarFooter && <Footer />}
    </>
  )
}

const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  )
}

export default App
