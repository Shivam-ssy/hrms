import SideNav from "./SideNav";
import * as React from "react";
import BasicBreadcrumbs from "../utils/Breadcrumbs";
import { Outlet } from "react-router-dom";
function HomeLayout() {
  const user = localStorage.getItem("user");
  console.log(JSON.parse(user));
  const handleclick = () => {
    localStorage.clear("user");
    window.location.href = "/";
  };
  return (
    <div className="h-screen w-full flex  relative">
      <div className="w-80 h-screen">
        <SideNav />
      </div>
      <div className="w-[90%] pt-10 ml-10">
        <div className="border py-5 border-black/20 border-x-0 px-5">
          <BasicBreadcrumbs/>
        </div>
      <div className="p-10 w-full max-h-screen overflow-auto relative">
        <Outlet/>
      </div>
      </div>
      {/* <button onClick={handleclick}>logout</button> */}
    </div>
  );
}

export default HomeLayout;
