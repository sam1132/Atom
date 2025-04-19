import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";


const User = () => {

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="relative flex-grow ml-[12.5px] rounded-[17.5px] bg-[#000000]/67.5 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default User;
