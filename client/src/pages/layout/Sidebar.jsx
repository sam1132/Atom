import { Link } from "react-router-dom";
import { useState } from "react";

import { FaCompass, FaPlus } from "react-icons/fa6";

import { useAuth } from "../auth/Context";

import DirectMessages from "../components/sidebar/directMessages/DirectMessages";
import UserDashboard from "../components/sidebar/userDashboard/UserDashboard";
import ServerDropdown from "../components/sidebar/servers/ServerDropdown";
import Tooltip from "../../utils/Tooltip";
import { TbHash, TbVideoFilled } from "react-icons/tb";
import { HiMiniSpeakerWave } from "react-icons/hi2";

const Sidebar = () => {
  const { backendUser } = useAuth();
  const [activeComponent, setActiveComponent] = useState(null);

  const handleIconClick = (component) => {
    setActiveComponent((prev) => (prev === component ? null : component));
  };

  const componentMap = {
    directMessages: <DirectMessages />,
    serverDropdown: <ServerDropdown />,
    userDashboard: <UserDashboard />,
  };

  const isExpanded = Boolean(activeComponent);

  return (
    <div
      className={`relative flex flex-col gap-2 w-[75px] bg-[#000000]/67.5 transition-all duration-250 ${
        isExpanded ? "w-[335px]" : ""
      } rounded-[17.5px] group overflow-hidden shrink-0`}
    >
      <div className="absolute top-0 bottom-0 transition-all duration-250 flex flex-col items-center gap-2.5 z-[1] left-0 w-[75px]">
        <img
          src="/icon.svg"
          alt="atom logo"
          className="w-[45px] mt-[15px] mb-[5px] cursor-pointer"
          onClick={() => {
            handleIconClick("directMessages");
          }}
        />
        <Link to="/user/discover">
          <button className="border-0 bg-[#2f184b]/37.5 rounded-[17.5px] cursor-pointer transition-all duration-250 w-[45px] h-[45px] grid place-items-center hover:bg-[#2f184b] text-[#bbb] hover:text-[#eee] text-2xl">
            <FaCompass />
          </button>
        </Link>
        <button className="border-0 bg-[#2f184b]/37.5 rounded-[17.5px] cursor-pointer transition-all duration-250 w-[45px] h-[45px] grid place-items-center hover:bg-[#2f184b] text-[#bbb] hover:text-[#eee] text-2xl">
          <FaPlus />
        </button>
        {/* <Tooltip position="right" text="Discover"> */}
        <img
          src="/image.png"
          alt="atom logo"
          className="w-[45px] h-[45px] border-0 opacity-67.5 rounded-[17.5px] cursor-pointer object-cover transition-all duration-250 bg-[#2f184b]/37.5 hover:bg-[#2f184b] hover:opacity-100"
          onClick={() => {
            handleIconClick("serverDropdown");
          }}
        />
        {/* </Tooltip> */}
        <div className="mt-auto mb-[15px]">
          <img
            src={backendUser?.avatar}
            alt={backendUser?.displayName}
            className="w-[45px] h-[45px] border-0 opacity-67.5 rounded-full cursor-pointer object-cover transition-all duration-250 bg-[#2f184b]/37.5 hover:bg-[#2f184b] hover:opacity-100"
            onClick={() => {
              handleIconClick("userDashboard");
            }}
            onError={(e) => {
              e.target.src =
                "https://i.pinimg.com/236x/08/f6/4a/08f64a7cb64b67167d6b5e75429b26bb.jpg";
            }}
          />
        </div>
      </div>

      <div
        className={`absolute top-0 bottom-0 left-[75px] w-[0px] transition-all duration-250 ${
          isExpanded ? "w-[260px]" : ""
        } rounded-tr-[17.5px] rounded-br-[17.5] overflow-hidden`}
      >
        <div className="absolute inset-[10px] left-[0px] rounded-[10px] bg-[#2f184b]/37.5">
          {componentMap[activeComponent]}
          <nav className=" flex flex-col w-full py-[10px] px-[10px] gap-[5px]">
            <div className="hover:bg-[#2f184b] rounded-[7.5px] transition-all duration-250 flex items-center gap-2 py-0 px-[10px] w-full h-10 cursor-pointer text-[#bbb] hover:text-[#eee]">
              <TbHash className="text-xl" />
              <p className="text-sm font-semibold">text-channel</p>
            </div>
            <div className="hover:bg-[#2f184b] rounded-[7.5px] transition-all duration-250 flex items-center gap-2 py-0 px-[10px] w-full h-10 cursor-pointer text-[#bbb] hover:text-[#eee]">
              <HiMiniSpeakerWave className="text-xl" />
              <p className="text-sm font-semibold">audio-channel</p>
            </div>
            <div className="hover:bg-[#2f184b] rounded-[7.5px] transition-all duration-250 flex items-center gap-2 py-0 px-[10px] w-full h-10 cursor-pointer text-[#bbb] hover:text-[#eee]">
              <TbVideoFilled className="text-xl" />
              <p className="text-sm font-semibold">video-channel</p>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
