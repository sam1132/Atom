import { BsEmojiLaughingFill } from "react-icons/bs";
import { FaCirclePlus } from "react-icons/fa6";
import { HiGif } from "react-icons/hi2";
import { PiPhoneCallFill } from "react-icons/pi";
import { TbVideoFilled } from "react-icons/tb";

import { ImPhoneHangUp } from "react-icons/im";
import { PiMicrophoneSlashFill } from "react-icons/pi";

const Message = () => {
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
            Sameer
          </p>
        </div>

        <div className="flex">
          {/* <button className="border-0 cursor-pointer w-[45px] h-[45px] grid place-items-center text-[#bbb] hover:text-[#eee] text-2xl">
            <PiPhoneCallFill />
          </button>

          <button className="border-0 cursor-pointer w-[45px] h-[45px] grid place-items-center text-[#bbb] hover:text-[#eee] text-2xl">
            <TbVideoFilled />
          </button> */}

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
              <button className="border-0 cursor-pointer w-[35px] h-[35px] pb-[2.5px] bg-red-600/25 hover:bg-red-600/75 rounded-full grid place-items-center text-[#bbb] hover:text-[#eee] text-lg">
                <ImPhoneHangUp />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto h-[45px] w-full rounded-[10px] bg-[#2f184b]/37.5 border-[1px] border-[#2f184b]/75 flex items-center">
        <button className="border-0 cursor-pointer w-[46px] h-[45px] grid place-items-center text-[#bbb] hover:text-[#eee] text-lg">
          <FaCirclePlus />
        </button>
        <input
          type="text"
          className="flex-1 py-3 border:none focus:outline-none text-sm font-normal text-[#eee] bg-transparent"
          placeholder="Message @Sameer"
        />
        <div className="flex ml-[11.25px]">
          <button className="border-0 cursor-pointer h-[45px] grid place-items-center text-[#bbb] hover:text-[#eee] text-2xl">
            <HiGif />
          </button>
          <button className="border-0 cursor-pointer w-[45px] h-[45px] grid place-items-center text-[#bbb] hover:text-yellow-500 text-lg">
            <BsEmojiLaughingFill />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
