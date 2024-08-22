import { useState } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom"
import Landing from './component/Landing'
import Login from './component/Login'
import Register from './component/Register.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/login' element={<Navigate to="/"/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
