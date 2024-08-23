import { useState } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route, Navigate, useNavigate} from "react-router-dom"
import Landing from './component/Landing'
import Login from './component/Login'
import Register from './component/Register.jsx'
import Dashboard from './component/DashBoard/Dashboard.jsx'
import HomeLayout from './component/HomeLayout.jsx'
function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/login' element={<Navigate to="/"/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route  path="/" element={<HomeLayout/>}>
            <Route path='/dashboard' element={<Dashboard/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
