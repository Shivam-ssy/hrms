import { useState } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route, Navigate, useNavigate} from "react-router-dom"
import Landing from './component/Landing'
import Login from './component/Login'
import Register from './component/Register.jsx'
import Dashboard from './component/DashBoard/Dashboard.jsx'
import HomeLayout from './component/HomeLayout.jsx'
import EmployList from './component/EmployList/EmployList.jsx'
import  LeaveRequestForm  from './component/LeaveRequestForm.jsx'
import Profile from './component/Profile/Profile.jsx'
import EditModal from './component/EditModal.jsx'
function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/login' element={<Navigate to="/"/>}/>
          <Route  path="/" element={<HomeLayout/>}>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/employee' element={<EmployList/>}/>
            <Route path='/apply-leave' element={<LeaveRequestForm/>}/>
            <Route path='/create-employee' element={<Register/>}/>
            <Route path='/edit/:id' element={<EditModal/>}/>
            <Route path='/profile' element={<Profile/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
