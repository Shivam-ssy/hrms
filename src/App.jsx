import './App.css'
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom"
import Login from './component/Login'
import Register from './component/Register.jsx'
import Dashboard from './component/DashBoard/Dashboard.jsx'
import HomeLayout from './component/HomeLayout.jsx'
import StickyHeadTable from './component/EmployList/EmployeeLists.jsx'
import  LeaveRequestForm  from './component/LeaveRequestForm.jsx'
import EditModal from './component/EditModal.jsx'
// import DashboardLayoutBasic from './component/SideNavs.jsx'
import EditUserPage from './component/EmployList/EmployeeProfile.jsx'
import SimpleAreaChart from './component/Performance/CompanyPerformance.jsx'
import SimpleLineChart from './component/Performance/IndividualPerformance.jsx'
import PayrollManagement from './component/Payroll/PayrollManagement.jsx'
import PayrollReports from './component/Payroll/PayrollReports.jsx'
import DashboardHR from './component/Payroll/DashboardHR.jsx'
import PayrollDashboard from './component/Payroll/PayrollDashboard.jsx'
import PerformanceReview from './component/Performance/PerformanceReview.jsx'
import { access } from './utils/Role.js'
function App() {
  const user=localStorage.getItem('userData')
  const userData=JSON.parse(user);
  console.log(userData);
  
  const role=userData?.role || "user"
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/login' element={<Navigate to="/"/>}/>
          <Route  path="/" element={<HomeLayout/>}>
            <Route path='/dashboard' element={<Dashboard/>}/>
            {
              access.admin.includes(role) &&
            <Route path='/employee' element={<StickyHeadTable/>}/>}
            <Route path='/apply-leave' element={<LeaveRequestForm/>}/>
            {
              access.admin.includes(role) &&
            <Route path='/create-employee' element={<Register/>}/>}
              {
              access.admin.includes(role) &&
            <Route path='/edit/:id' element={<EditModal/>}/>}
            <Route path='/profile' element={<EditUserPage/>}/>
            <Route path='/company-performance' element={<SimpleAreaChart/>}/>
            <Route path='/individual-perfromance' element={<SimpleLineChart/>}/>
            {
              access.admin.includes(role) &&
            <Route path='/review-perfromance' element={<PerformanceReview/>}/>}
            {
              access.admin.includes(role) &&
            <Route path='/payroll-create' element={<PayrollManagement/>}/>}
              {
              access.admin.includes(role) &&
            <Route path='/payroll-report' element={<PayrollReports/>}/>}
            <Route path='/payroll-dashboard' element={<PayrollDashboard/>}/>
            {
              access.admin.includes(role) &&
            <Route path='/payroll-hr' element={<DashboardHR/>}/>}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
