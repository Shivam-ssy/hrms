// import SideNav from "./SideNav";
// import * as React from "react";
import BasicBreadcrumbs from "../utils/Breadcrumbs";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
function HomeLayout() {
  const user = localStorage.getItem("user");
  console.log(JSON.parse(user));
  // const handleclick = () => {
  //   localStorage.clear("user");
  //   window.location.href = "/";
  // };
  return (
    <div className="h-screen w-full flex  relative">
      <div className="w-0 max-h-screen  overflow-y-auto element-class overflow-x-hidden md:w-64">
        {/* <SideNav /> */}
        <Sidebar/>
      </div>
      <div className="md:w-[80%] w-full pt-10 ml-10">
        <div className="border ml-5 py-5 border-black/20 border-x-0 px-5">
          <BasicBreadcrumbs/>
        </div>
      <div className="p-10  w-full max-h-screen overflow-auto relative">
        <Outlet/>
      </div>
      </div>
      {/* <button onClick={handleclick}>logout</button> */}
    </div>
  );
}

export default HomeLayout;
