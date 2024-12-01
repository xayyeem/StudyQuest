import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

function App() {

  return (
    <div className="w-full min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>

  )
}

export default App
