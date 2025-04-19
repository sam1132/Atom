import React, { useState,useRef } from "react";
import { BsEmojiLaughingFill } from "react-icons/bs";
import { FaCirclePlus } from "react-icons/fa6";
import { HiGif } from "react-icons/hi2";
import { PiPhoneCallFill, PiMicrophoneSlashFill } from "react-icons/pi";
import { TbVideoFilled } from "react-icons/tb";
import { BiSend } from "react-icons/bi";

import { ImPhoneHangUp } from "react-icons/im";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { GoFileSubmodule } from "react-icons/go";
const Message = () => {
  const actions = [{ icon: <GoFileSubmodule />, name: "Share Documents" }];
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVideoActive, setIsVideoActive] = useState(false);

  const fileInputRef = useRef(null);

  const handleDocumentClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      onFilesSelected(files); 
    }
  };
  return (
    <div className="absolute top-0 bottom-0 transition-all duration-250 flex flex-col items-center p-[15px] w-full">
      <div className="h-[45px] w-full rounded-[10px] flex items-center">
        <div className="flex-1 flex items-center gap-3">
          <img
            src="/image.png"
            alt="atom logo"
            className="w-[33.75px] h-[33.75px] border-0 opacity-67.5 rounded-full transition-all duration-250"
          />
          <p className="p-0 text-sm font-bold cursor-pointer text-[#bbb] hover:text-[#eee]">
            Jaspreet
          </p>
        </div>

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

          <button className="border-0 cursor-pointer w-[45px] h-[45px] grid place-items-center text-[#bbb] hover:text-[#eee] text-2xl">
            <TbVideoFilled />
          </button>
        </div>
      </div>

      <div className="mt-auto h-[45px] w-full rounded-[10px] bg-[#2f184b]/37.5 border-[1px] border-[#2f184b]/75 flex items-center">
          {/* <FaCirclePlus /> */}
          <SpeedDial
            ariaLabel="SpeedDial for file sharing"
            sx={{ position: "fixed", bottom: 22, left: 120, '& .MuiFab-primary': {
              bgcolor: '#eee',
              height: 25,
              width: 35,
            },
            '& .MuiSpeedDialIcon-root': {
              fontSize: 2, 
              color: '#777',
            }}}  
            direction="right"
            icon={<SpeedDialIcon />}
          >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
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
          />

        <input
          type="text"
          className=" ml-20 flex-1 py-3 border:none focus:outline-none text-sm font-normal text-[#eee] bg-transparent"
          placeholder="Message @Jaspreet"
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
