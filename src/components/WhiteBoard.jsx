import React from 'react'
import { Tldraw } from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'
import { useNavigate } from 'react-router-dom'

const Whiteboard = () => {
  const navigate = useNavigate()

  return (
    <div className="relative w-screen h-screen">
      <Tldraw />

      {/* Floating Go Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute bottom-12 right-2 cursor-pointer z-50 px-4 py-2 bg-white bg-opacity-90 text-black text-sm font-semibold border border-gray-300 rounded-lg shadow-md backdrop-blur hover:bg-opacity-100 transition"
      >
        Go Back
      </button>
    </div>
  )
}

export default Whiteboard
