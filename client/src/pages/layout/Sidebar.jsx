import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { FaCompass, FaPlus } from "react-icons/fa6";

import { useAuth } from "../auth/Context";

import CreateServer from "../components/sidebar/CreateServer";
import DirectMessages from "../components/sidebar/directMessages/DirectMessages";
import UserDashboard from "../components/sidebar/userDashboard/UserDashboard";
import ServerDropdown from "../components/sidebar/servers/ServerDropdown";
import Tooltip from "../../utils/Tooltip";

const Sidebar = () => {
  const { backendUser } = useAuth();
  const [activeComponent, setActiveComponent] = useState(null);
  const [selectedServerId, setSelectedServerId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();

  const handleIconClick = (component) => {
    setActiveComponent((prev) => (prev === component ? null : component));
    if (component !== "serverDropdown") setSelectedServerId(null);
  };

  const handleServerClick = (serverId) => {
    navigate(`/user/server/${serverId}`);
    if (activeComponent === "serverDropdown" && selectedServerId === serverId) {
      setActiveComponent(null);
      setSelectedServerId(null);
    } else {
      setActiveComponent("serverDropdown");
      setSelectedServerId(serverId);
    }
  };

  const componentMap = {
    directMessages: <DirectMessages />,
    serverDropdown: <ServerDropdown serverId={selectedServerId} />,
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
          <button className="border-0 bg-[#2f184b]/37.5 rounded-[17.5px] cursor-pointer transition-all duration-250 w-[45px] h-[45px] grid place-items-center hover:bg-[#2f184b] text-[#bbb] hover:text-[#eee] text-2xl shrink-0">
            <FaCompass />
          </button>
        </Link>
        <button
          onClick={() => setShowCreateModal(true)}
          className="border-0 bg-[#2f184b]/37.5 rounded-[17.5px] cursor-pointer transition-all duration-250 w-[45px] h-[45px] grid place-items-center hover:bg-[#2f184b] text-[#bbb] hover:text-[#eee] text-2xl shrink-0"
        >
          <FaPlus />
        </button>
        {showCreateModal && (
          <CreateServer onClose={() => setShowCreateModal(false)} />
        )}
        <div className="h-[2.5px] w-[45px] bg-white/10 rounded-full" />
        <div className="flex flex-col items-center w-full gap-2.5 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          {backendUser?.servers?.map((server) => (
            <img
              key={server._id}
              src={server.icon}
              alt={server.name}
              className="w-[45px] h-[45px] border-0 opacity-67.5 rounded-[17.5px] cursor-pointer object-cover transition-all duration-250 bg-[#2f184b]/37.5 hover:bg-[#2f184b] hover:opacity-100"
              onClick={() => {
                handleServerClick(server._id);
              }}
              onError={(e) => {
                e.target.src =
                  "https://pm1.aminoapps.com/8181/665e7c6631522e9946805aa7866e4675d74211f0r1-2000-2000v2_uhq.jpg";
              }}
            />
          ))}
        </div>
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
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
