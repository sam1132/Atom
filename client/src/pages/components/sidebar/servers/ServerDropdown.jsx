import { useState } from "react";

import { LuCircleFadingPlus } from "react-icons/lu";
import { PiGear } from "react-icons/pi";
import { RiArrowDownSLine } from "react-icons/ri";
import { TbDoorExit, TbUserPlus, TbUsers } from "react-icons/tb";

const ServerDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className="flex items-center justify-between p-[15px] pb-[5px] mt-[2.5px] text-[#aaa] cursor-pointer"
        onClick={toggleDropDown}
      >
        <div className="font-bold text-sm">Server Name</div>
        <RiArrowDownSLine className="text-lg" />
      </div>

      {isOpen && (
        <div className="w-full flex justify-center z-10">
          <nav className=" flex flex-col w-[230px] py-[5px] px-[5px] bg-[#2f184b]/37.5 rounded-[10px]">
            <div className="hover:bg-[#2f184b] rounded-[7.5px] transition-all duration-250 flex items-center justify-between py-0 px-[10px] w-full h-10 cursor-pointer text-[#bbb] hover:text-[#eee]">
              <p className="text-sm font-semibold">Invite People</p>
              <TbUserPlus className="text-xl" />
            </div>
            <div className="hover:bg-[#2f184b] rounded-[7.5px] transition-all duration-250 flex items-center justify-between py-0 px-[10px] w-full h-10 cursor-pointer text-[#bbb] hover:text-[#eee]">
              <p className="text-sm font-semibold">Server Settings</p>
              <PiGear className="text-xl" />
            </div>
            <div className="hover:bg-[#2f184b] rounded-[7.5px] transition-all duration-250 flex items-center justify-between py-0 px-[10px] w-full h-10 cursor-pointer text-[#bbb] hover:text-[#eee]">
              <p className="text-sm font-semibold">Manage Members</p>
              <TbUsers className="text-xl" />
            </div>
            <div className="hover:bg-[#2f184b] rounded-[7.5px] transition-all duration-250 flex items-center justify-between py-0 px-[10px] w-full h-10 cursor-pointer text-[#bbb] hover:text-[#eee]">
              <p className="text-sm font-semibold">Create Channel</p>
              <LuCircleFadingPlus className="text-xl" />
            </div>
            <div className="hover:bg-red-900/25 rounded-[7.5px] transition-all duration-250 flex items-center justify-between py-0 px-[10px] w-full h-10 cursor-pointer text-red-600/75 hover:text-red-600">
              <p className="text-sm font-semibold">Leave Server</p>
              <TbDoorExit className="text-xl" />
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default ServerDropdown;
