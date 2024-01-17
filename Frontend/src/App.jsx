import { useState, useEffect } from 'react'
import './App.css'
// import DataFetcher from './components/DataFetcher'
import Home from './pages/Home'
import { BrowserRouter,Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { useAuthContext } from './hooks/useAuthContext'
import FoodPlan from './pages/FoodPlan'
import ForgotPassword from './pages/ForgotPassword'
function App() {
  const {user} = useAuthContext()
  let data  = null
  if(user){

    data = user.data
  }
  return (
    <div className='App'>
    <BrowserRouter>
      <Navbar/>
      <div className = 'pages'>
          <Routes>
            <Route path = "/" element = { data?<Home/>: <Navigate to = "/login"/>}/>
            <Route path = "/login" element = {!data? <Login/> : <Navigate to = "/"/>}/>
            <Route path = '/signup' element = {!data?<Signup/>: <Navigate to = "/"/>}/>
            <Route path = '/plans/:id' element = {<FoodPlan/>}/>
            <Route path = "/forgotPassword" element = {<ForgotPassword/>}/>
          </Routes>
      </div>
      </BrowserRouter>
  </div>
  )
}
export default App
