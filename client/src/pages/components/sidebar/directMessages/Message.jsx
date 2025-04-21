import React, { useState, useRef,useEffect } from "react";
import { BsEmojiLaughingFill } from "react-icons/bs";
import { HiGif } from "react-icons/hi2";
import { PiPhoneCallFill, PiMicrophoneSlashFill } from "react-icons/pi";
import { TbVideoFilled } from "react-icons/tb";
import { BiSend } from "react-icons/bi";

import { ImPhoneHangUp } from "react-icons/im";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { GoFileSubmodule } from "react-icons/go";
import Chat from "./Chat";

import { useChat } from "../../../../Context/ChatContext";
const Message = () => {
  const { activeChatUser } = useChat();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (activeChatUser) {
      setUserData(activeChatUser);
    }
  }, [activeChatUser]);
  const fileInputRef = useRef(null);
  const actions = [
    {
      icon: <GoFileSubmodule />,
      name: "Share Documents",
      onclick: () => {
        fileInputRef.current.click();
      },
    },
  ];
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVideoActive, setIsVideoActive] = useState(false);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      onFilesSelected(files);
    }
  };
  return (
    <div className="absolute top-0 bottom-0 transition-all duration-250 flex flex-col p-[15px] w-full">
      <div className="h-[45px] w-full rounded-[10px] flex items-center">
        {userData ? (
          <div className="flex-1 flex items-center gap-3">
            <img
              src={userData.avatar}
              alt="useravatar"
              className="w-[33.75px] h-[33.75px] border-0 opacity-67.5 rounded-full transition-all duration-250"
            />
            <p className="p-0 text-sm font-bold cursor-pointer text-[#bbb] hover:text-[#eee]">
              {userData.displayName} {/* username */}
              {/* username */}
            </p>
          </div>
        ) : (
          <div>
            <p className="p-0 text-sm font-bold cursor-pointer text-[#bbb] hover:text-[#eee]">
              No user selected
            </p>
          </div>
        )}

        {/*   Call and video chat action start */}
        <div className="flex">
          {isCallActive ? (
            <div className="flex items-center justify-center px-[5px] h-[45px] rounded-full bg-[#2f184b]/37.5">
              <div className="flex flex-row justify-center gap-[7.5px] w-[75px]">
                <div className="w-[8.75px] h-[8.75px] rounded-full bg-[#bbb] animate-bounce"></div>
                <div className="w-[8.75px] h-[8.75px] rounded-full bg-[#bbb] animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-[8.75px] h-[8.75px] rounded-full bg-[#bbb] animate-bounce [animation-delay:-.6s]"></div>
              </div>
              <div className="flex items-center justify-center gap-[5px]">
                <button className="border-0 cursor-pointer w-[35px] h-[35px] bg-gray-600/25 hover:bg-red-600/75 rounded-full grid place-items-center text-[#bbb] hover:text-[#eee] text-lg">
                  <PiMicrophoneSlashFill />
                </button>
                <button
                  className="border-0 cursor-pointer w-[35px] h-[35px] pb-[2.5px] bg-red-600/25 hover:bg-red-600/75 rounded-full grid place-items-center text-[#bbb] hover:text-[#eee] text-lg"
                  onClick={() => setIsCallActive(false)}
                >
                  <ImPhoneHangUp />
                </button>
              </div>
            </div>
          ) : (
            <button
              className="border-0 cursor-pointer w-[45px] h-[45px] grid place-items-center text-[#bbb] hover:text-[#eee] text-2xl"
              onClick={() => setIsCallActive(true)}
            >
              <PiPhoneCallFill />
            </button>
          )}
          {/*call end*/}
          <button className="border-0 cursor-pointer w-[45px] h-[45px] grid place-items-center text-[#bbb] hover:text-[#eee] text-2xl">
            <TbVideoFilled />
          </button>
          {/* Video end */}
        </div>
      </div>
      {/*   Call and video chat action end */}
      <div className="mt-6 flex-1 overflow-y-auto">
        <Chat />
      </div>
      <div className="mt-auto h-[45px] w-full rounded-[10px] bg-[#2f184b]/37.5 border-[1px] border-[#2f184b]/75 flex items-center">
        {/* <FaCirclePlus /> */}
        <SpeedDial
          ariaLabel="SpeedDial for file sharing"
          sx={{
            position: "relative",
            bottom: 22,
            top: 1,
            left: 0,
            "& .MuiFab-primary": {
              bgcolor: "#eee",
              height: 25,
              width: 35,
            },
            "& .MuiSpeedDialIcon-root": {
              fontSize: 2,
              color: "#777",
            },
          }}
          direction="right"
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.onclick}
            />
          ))}
        </SpeedDial>

        {/* Hidden file input for multiple files */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          multiple
          accept=".jpg, .jpeg, .png, .pdf, .docx, .xlsx,.doc,.avif, .mp4, .mov, .mkv, .mp3,"
        />

        <input
          type="text"
          className="flex-1 py-3 border:none focus:outline-none text-sm font-normal text-[#eee] bg-transparent"
          placeholder={`message @ ${userData ? userData.displayName : ""}`}
        />
        {/* Bottom message send bar */}
        <div className="flex ml-[11.25px]">
          <button className="border-0 cursor-pointer h-[45px] grid place-items-center text-[#bbb] hover:text-[#eee] text-2xl">
            <HiGif />
          </button>
          <button className="border-0 cursor-pointer w-[45px] h-[45px] grid place-items-center text-[#bbb] hover:text-yellow-500 text-lg">
            <BsEmojiLaughingFill />
          </button>
          <button className="border-0 cursor-pointer h-[45px] grid place-items-center text-[#bbb] hover:text-[#638ecb] text-2xl mr-5">
            <BiSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
