import { NavLink, Outlet } from "@remix-run/react";
import { useState } from "react";

import { useOptionalUser, parseNgrams } from "~/utils";
const Dashboard = (props) => {
  const activeLinkClassHandler = ({ isActive, isPending }) =>
    isActive ? "font-bold" : "font-normal";
  return (
    <>
      <main className="flex md:flex-row bg-slate-800 white text-white h-full">
        <div className=" h-full w-1/4 max-w-40 border-r border-slate-700 p-2 flex flex-col gap-2">
          <h2>Sidebar</h2>
          <NavLink className={activeLinkClassHandler} to="/dashboard/upload">
            Upload
          </NavLink>
          <NavLink className={activeLinkClassHandler} to="/dashboard" end>
            Dashboard
          </NavLink>
        </div>
        <div className="p-2">
          <Outlet />
        </div>
      </main>
    </>
  );
};
export default Dashboard;
