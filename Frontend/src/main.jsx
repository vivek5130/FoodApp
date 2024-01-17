import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Navbar from './components/Navbar.jsx'
import { FoodPlanContextProvider } from "./context/FoodPlanContext.jsx"
import { AuthContextProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <FoodPlanContextProvider>
      <App />

    </FoodPlanContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
