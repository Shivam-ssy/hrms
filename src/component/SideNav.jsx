import React from 'react'
function SideNav() {
    const localData=localStorage.getItem("user")
    const user=JSON.parse(localData)
    console.log(user.photoURL);
    
  return (
    <div className='font-serif  fixed w-80 border left-0 h-screen bg-transparent'>
      <div className='flex flex-col border py-16 items-center'>
      <img
                  className="bg-white p-2 rounded-full w-24 h-24"
                  src={user.photoURL}
                  onError='/user-3-fill.svg'
                  alt=""
                />
        <h3 className=' text-xl'>{user.displayName}</h3>
      </div>
      <div>
        <ul className='mt-3 px-2' >
            <li className='mb-3 text-lg cursor-pointer flex items-center gap-2 font-semibold'><i  className="ri-home-3-fill "></i>DashBoard</li>
            <li className='mb-3 text-lg cursor-pointer flex items-center gap-2 font-semibold'><i className="ri-user-2-fill "></i>Employee Managment</li>
            <li className='mb-3 text-lg cursor-pointer flex items-center gap-2 font-semibold'><i className="ri-calendar-schedule-line "></i>Leave Management</li>
            <li className='mb-3 text-lg cursor-pointer flex items-center gap-2 font-semibold'><i className="ri-money-rupee-circle-fill "></i>Payroll Managment</li>
            <li className='mb-3 text-lg cursor-pointer flex items-center gap-2 font-semibold'><i className="ri-group-fill "></i>Performance Managment</li>
            <li className='mb-3 text-lg cursor-pointer flex items-center gap-2 font-semibold'><i className="ri-notification-3-fill "></i>Notification</li>
            <li className='mb-3 text-lg cursor-pointer flex items-center gap-2 font-semibold'><i className="ri-folder-chart-line "></i>Report</li>
            <li className='mb-3 text-lg cursor-pointer flex items-center gap-2 font-semibold'><i className="ri-user-settings-line "></i>Setting</li>
        </ul>
      </div>
    </div>
  )
}

export default SideNav
