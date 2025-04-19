import { TbCopy } from "react-icons/tb";
import { TbProgressCheck } from "react-icons/tb";

const Settings = () => {
  return (
    <div className="flex flex-col items-center p-[15px] h-full w-full gap-[15px]">
      <div className="flex items-center h-[45px] w-full text-xs font-bold text-[#aaa] uppercase">
        Profile and Account Settings
      </div>
      <div className="flex items-center w-full gap-[15px] max-[625px]:flex-col">
        <div className="flex flex-col justify-center w-full gap-[10px]">
          <p className="text-[#bbb] text-sm max-[625px]:text-xs font-bold ">
            Display Name
          </p>
          <div className="flex items-center w-full gap-[7.5px]">
            <input
              type="text"
              placeholder="current.name"
              className="h-[37.5px] w-full px-3 py-3 rounded-[10px] bg-[#2f184b]/37.5 border-[1px] border-[#2f184b]/75 focus:outline-none text-sm font-normal text-[#eee]"
            />
            <div className="flex items-center justify-center h-[37.5px] min-w-[37.5px] w-[37.5px] shrink-0 rounded-[10px] text-xl text-[#bbb] hover:text-[#eee] bg-purple-950/75 hover:bg-purple-950 over">
              <TbProgressCheck />
            </div>
          </div>

          <p className="text-[#bbb] text-sm max-[625px]:text-xs font-bold ">
            Avatar
          </p>
          <div className="flex items-center w-full gap-[7.5px]">
            <button
              type="submit"
              // disabled={loading}
              className="cursor-pointer flex items-center justify-center h-[37.5px] w-full text-[#bbb] hover:text-[#eee] bg-purple-950/75 hover:bg-purple-950 rounded-[10px]"
            >
              <p className="text-xs font-bold">Change Avatar</p>
            </button>
            <button
              type="submit"
              // disabled={loading}
              className="cursor-pointer flex items-center justify-center h-[37.5px] w-full text-[#bbb] hover:text-[#eee] bg-white/5 hover:underline rounded-[10px]"
            >
              <p className="text-xs font-bold">Remove Avatar</p>
            </button>
          </div>
        </div>

        <div className="relative w-full flex flex-col gap-[5px] bg-[#2f184b]/37.5 rounded-[10px] border-[1px] border-[#2f184b]/75">
          <img
            src="/image.png"
            alt="atom logo"
            className="absolute top-[18.75px] left-[18.75px] w-[75px] h-[75px] border-0 rounded-full"
          />
          <div className="h-[56.25px] w-full bg-black/67.5 rounded-tl-[10px] rounded-tr-[10px]"></div>
          <p className="text-[#eee] text-sm font-bold pl-[18.75px] mt-[37.5px]">
            CurrentName
          </p>
          <div className="flex items-center gap-[7.5px] pl-[18.75px] pb-[12.5px] text-[#bbb] ">
            <p className="text-xs font-semibold">USERID</p>
            <TbCopy className="text-sm cursor-pointer hover:text-[#eee]" />
          </div>
        </div>
      </div>
      <div className="mt-auto max-[625px]:mt-0 flex flex-col justify-center gap-[10px] w-full text-sm max-[625px]:text-xs">
        <button
          // disabled={loading}
          className="cursor-pointer flex items-center justify-center h-[37.5px] w-full rounded-[7.5px] text-red-600/75 hover:text-red-600 bg-white/5"
        >
          <p className="text-xs font-bold">Delete Account</p>
        </button>
      </div>
    </div>
  );
};

export default Settings;
