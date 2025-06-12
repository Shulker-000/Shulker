import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Whiteboard from './components/WhiteBoard'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whiteboard" element={<Whiteboard />} />
      </Routes>
    </Router>
  )
}

export default App
