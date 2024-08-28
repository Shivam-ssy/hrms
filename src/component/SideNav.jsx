import React, { useEffect } from "react";
import MenuOption from "../utils/MenuOption";
import { useState } from "react";
import { Link } from "react-router-dom";
import AlertDialog from "../utils/AlertDialog";
import { logout } from "../BackendAsService/features";
function SideNav() {
  const localData = localStorage.getItem("user");
  let role ="ceo"
  const [open, setOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  useEffect(()=>{
    const signout = async() => {
      const res=await logout()
      if (res) {
        
        window.location.href = "/";
      }
      
  
    };
    if (isAgreed) {
      
      signout()
    }
  },[isAgreed])
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = (value) => {
    setIsAgreed(value);
   
  };

  const user = JSON.parse(localData);
  console.log(user.photoURL);
  const temp = [
    {
      Link: "/employee/repo",
      title: "Crete a repo",
    },
  ];
  return (
    <div className="font-serif  fixed w-80 border left-0 h-screen bg-transparent">
      <AlertDialog
        title={`Alert`}
        open={open}
        handleClose={handleClose}
        content="Are You Sure to Log Out"
        isAgreed={handleAgree}
      />
      <div className="flex flex-col border py-16 items-center">
        <img
          className="bg-white p-2 rounded-full w-24 h-24"
          src={user.photoURL || "/user-3-fill.svg"}
         
          alt=""
        />
        <h3 className=" text-xl">{user.displayName}</h3>
      </div>
      <div>
        <ul className="mt-3 px-2">
          <li className="mb-3 text-lg cursor-pointer flex items-center gap-2 font-semibold">
            <Link to="/dashboard"><i className="ri-home-3-fill "></i> DashBoard</Link>
          </li>
          <li className="mb-3 text-lg cursor-pointer flex items-center gap-2 font-semibold">
           <details className="flex flex-col">
            <summary className="list-none"> <i className="ri-user-2-fill "></i> Emplyee Management</summary>
            <Link className="text-base font-normal px-10 " to="/employee">Employee Directory</Link>
            {/* <Link className="text-base font-normal px-10 " to="/create-employee">Create a Employee</Link> */}
            </details>
          </li>
          <li className="mb-3 text-lg cursor-pointer flex items-center gap-2 font-semibold">
            {/* <i className="ri-calendar-schedule-line "></i>Leave Management */}
            <details>
              <summary className="list-none"><i className="ri-calendar-schedule-line "></i> Leave Management</summary>
      <Link className="text-base font-normal px-10 " to="/apply-leave">Apply Leave</Link>
       </details>
          </li>
          <li className="mb-3 text-lg cursor-pointer flex items-center gap-2 font-semibold">
            <i className="ri-money-rupee-circle-fill "></i>Payroll Managment
          </li>
          <li className="mb-3 text-lg cursor-pointer flex items-center gap-2 font-semibold">
            <i className="ri-group-fill "></i>Performance Managment
          </li>
          <li className="mb-3 text-lg cursor-pointer flex items-center gap-2 font-semibold">
            <i className="ri-notification-3-fill "></i>Notification
          </li>
          <li className="mb-3 text-lg cursor-pointer flex items-center gap-2 font-semibold">
            <i className="ri-folder-chart-line "></i>Report
          </li>
          <li className="mb-3 text-lg cursor-pointer flex items-center gap-2 font-semibold">
            {/* <i className="ri-user-settings-line "></i>Setting */}
            <details className="flex flex-col">
              <summary className="list-none"><i className="ri-calendar-schedule-line "></i> Setting</summary>
                    <Link to="/profile" className="text-base font-normal px-10">Your Profile</Link>
                    <button className="font-normal text-base mx-10 " onClick={handleClickOpen}>logout</button>

            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideNav;
// admin can add or edit the employee
//employee and also edit his or her profile