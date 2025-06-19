import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

import AboutPage from './pages/AboutPage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import WhiteBoard from './components/WhiteBoard'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Contact from './pages/Contact'

const AppWrapper = () => {
  const location = useLocation()

  // Routes where Navbar should be hidden
  const hideNavbarFooterRoutes = ['/whiteboard']
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
        <Route path="/contact" element={<Contact />} />
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
