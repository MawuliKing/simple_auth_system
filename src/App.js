import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Dashboard from './pages/homepage'
import Signin from './pages/sign_in'
import Signup from './pages/sign_up'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' exact element={<Signin />} />
          <Route path='/signup' exact element={<Signup />} />
          <Route path='/dashboard' exact element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
