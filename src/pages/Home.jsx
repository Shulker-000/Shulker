import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to My App</h1>
      <Link to="/whiteboard" className='text-blue-600 text-2xl'>Go to the Whiteboard</Link>
    </div>
  )
}

export default Home
