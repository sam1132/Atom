import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Sidebar from './Components/Sidebar.jsx'
import Resources from './Pages/Resources'
const App = () => {
  return (
    <>
    <Router>
    <div className='bg-gray-900 h-screen'>
    <Sidebar/>
    <Routes>
      {/* <Route path="/" element={<h1 className=' text-center text-white'>Home</h1>} /> */}
      <Route path="/resources" element={<Resources />} />
    </Routes>
    </div>
    </Router>
    </>
  )
}

export default App

