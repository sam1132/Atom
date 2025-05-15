import { Link, useParams,useNavigate } from "react-router-dom";
import { useState, useEffect, } from "react";
import axios from "axios";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { LuCircleFadingPlus } from "react-icons/lu";
import { PiGear } from "react-icons/pi";
import { RiArrowDownSLine } from "react-icons/ri";
import toast from "react-hot-toast";
import {
  TbDoorExit,
  TbHash,
  TbUserPlus,
  TbUsers,
  TbVideoFilled,
} from "react-icons/tb";

import CreateChannel from "./CreateChannel";
import InvitePeople from "./InvitePeople";
import { useAuth } from "../../../auth/Context";
import { FaBell } from "react-icons/fa";

const ServerDropdown = () => {
  const { serverId } = useParams();
  const { backendUser,updateBackendUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState("GUEST");
  const [serverName, setServerName] = useState("Server Name");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showInvitePeople, setShowInvitePeople] = useState(false);
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServerData = async () => {
      try {
        const serverRes = await fetch(
          `http://localhost:3000/api/servers/${serverId}`
        );
        if (!serverRes.ok) throw new Error("Failed to fetch server");
        const serverData = await serverRes.json();
        setServerName(serverData.name);
        setChannels(serverData.channels || []);
        const memberRes = await fetch(
          `http://localhost:3000/api/members/${serverId}/${backendUser._id}`
        );
        if (!memberRes.ok) throw new Error("Failed to fetch member role");
        const memberData = await memberRes.json();
        setUserRole(memberData.role);
      } catch (err) {
        setError(err.message);
        console.error("Error:", err);
      }
    };
    if (serverId && backendUser?._id) {
      fetchServerData();
    }
  }, [serverId, backendUser?._id]);

  const getOptions = () => {
    const options = [];
    options.push({
      name: "Invite People",
      icon: <TbUserPlus className="text-xl" />,
      action: () => setShowInvitePeople(true),
    });

    if (userRole === "ADMIN") {
      options.push(
        {
          name: "Server Settings",
          icon: <PiGear className="text-xl" />,
        },
        {
          name: "Manage Members",
          icon: <TbUsers className="text-xl" />,
        },
        {
          name: "Create Channel",
          icon: <LuCircleFadingPlus className="text-xl" />,
          action: () => setShowCreateModal(true),
        }
      );
    }

    if (userRole === "MODERATOR") {
      options.push(
        {
          name: "Manage Members",
          icon: <TbUsers className="text-xl" />,
        },
        {
          name: "Create Channel",
          icon: <LuCircleFadingPlus className="text-xl" />,
          action: () => setShowCreateModal(true),
        },
        {
          name: "Leave Server",
          icon: <TbDoorExit className="text-xl" />,
          isDanger: true,
        }
      );
    }

    if (userRole === "GUEST") {
      options.push({
        name: "Leave Server",
        icon: <TbDoorExit className="text-xl" />,
        isDanger: true,
      });
    }

    return options;
  };
  const handleServerDeleted = (deletedServerId) => {
  updateBackendUser({
    servers: backendUser?.servers.filter(
      (server) => server._id !== deletedServerId
    ),
  });
};
console.log(serverId);
  const handleServerDelete = async () => {
  try {
    const token = await currentUser.getIdToken();
    const res = await axios.delete(`http://localhost:3000/api/servers/delete/${serverId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    console.log(res);

    if (res.status === 200) {
      handleServerDeleted(serverId);
      console.log("if block")
      navigate("/user/discover");
      toast.success("Server deleted successfully");
    }
  } catch (err) {
    console.error("Error deleting server:", err);
    toast.error("Failed to delete server frontend");
  }
};
  return (
    <div>
      <div
        className="flex items-center justify-between p-[15px] pb-[5px] mt-[2.5px] text-[#aaa] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="font-bold text-sm">{serverName}</div>
        <RiArrowDownSLine
          className={`text-lg transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="w-full flex justify-center z-10">
          <nav className=" flex flex-col w-[230px] py-[5px] px-[5px] bg-[#2f184b]/37.5 rounded-[10px]">
            {getOptions().map((option) => (
              <div
                key={option.name}
                onClick={option.action}
                className={`cursor-pointer rounded-[7.5px] transition-all duration-250 flex items-center justify-between py-0 px-[10px] w-full h-10 shrink-0"
                ${
                  option.isDanger
                    ? "hover:bg-red-900/25 text-red-600/75 hover:text-red-600"
                    : "hover:bg-[#2f184b] text-[#bbb] hover:text-[#eee]"
                }`}
              >
                <p className="text-sm font-semibold">{option.name}</p>
                {option.icon}
              </div>
            ))}
          </nav>
        </div>
      )}

      {showCreateModal && (
        <CreateChannel
          onClose={() => setShowCreateModal(false)}
          serverId={serverId}
        />
      )}
      {showInvitePeople && (
        <InvitePeople onClose={() => setShowInvitePeople(false)} />
      )}

      <nav className="flex flex-col h-full w-full py-[10px] px-[10px] gap-[5px]">
        {channels.map((channel) => {
          const Icon =
            {
              TEXT: TbHash,
              EVENT: FaBell,
              VIDEO: TbVideoFilled,
            }[channel.type] || TbHash;
          return (
            <Link
              to={`/user/server/${serverId}/${channel.type.toLowerCase()}/${
                channel._id
              }`}
              key={channel._id}
              className="hover:bg-[#2f184b] rounded-[7.5px] transition-all duration-250 flex items-center gap-2 py-0 px-[10px] w-full h-10 cursor-pointer text-[#bbb] hover:text-[#eee] shrink-0"
            >
              <Icon className="text-xl" />
              <p className="text-sm font-semibold">{channel.name}</p>
            </Link>
          );
        })}
      </nav>
      {userRole === "ADMIN" && (
        <button
          disabled={loading}
          onClick={handleServerDelete}
          className="mt-[48rem]  md:mt-[36.4rem] hover:bg-red-900/25 rounded transition-all duration-250 flex  items-center justify-between py-0 px-[20px] w-full h-10 cursor-pointer text-red-600/75 hover:text-red-600"
        >
          <p className="text-sm font-semibold">
            {loading ? "Deleting server..." : "Delete Server"}
          </p>
          <TbDoorExit className="text-xl" />
        </button>
      )}
    </div>
  );
};

export default ServerDropdown;
