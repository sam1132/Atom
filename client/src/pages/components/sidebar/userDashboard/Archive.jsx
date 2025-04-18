import Table from "./Table";

import { BsSearch } from "react-icons/bs";
import { HiViewGrid } from "react-icons/hi";
import { IoIosDocument } from "react-icons/io";
import { IoMdMusicalNotes } from "react-icons/io";
import { IoImages } from "react-icons/io5";
import { MdVideoLibrary } from "react-icons/md";
import { RiAndroidFill } from "react-icons/ri";

const Archive = () => {
  return (
    <div className="flex flex-col items-center p-[15px] h-full w-full gap-[15px] overflow-y-auto [&::-webkit-scrollbar]:hidden">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center h-[45px] shrink-0 text-xs font-bold text-[#aaa] uppercase">
          Archived Content
        </div>
        <div className="h-[37.5px] max-[475px]:w-[125px] rounded-[7.5px] bg-[#2f184b]/37.5 border-[1px] border-[#2f184b]/75 flex items-center overflow-hidden">
          <div className="border-0 h-[37.5px] w-[37.5px] shrink-0 grid place-items-center text-[#bbb] text-sm">
            <BsSearch />
          </div>
          <input
            type="text"
            className="flex-1 py-3 border:none focus:outline-none text-sm font-normal text-[#eee] bg-transparent"
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-[15px]">
        <button className="w-full flex items-center p-[7.5px] gap-[10px] cursor-pointer text-[#bbb] hover:text-[#eee] bg-purple-950/75 hover:bg-purple-950 rounded-[10px]">
          <div className="h-[45px] min-w-[45px] w-[45px] shrink-0 rounded-full grid place-items-center text-[22px] bg-white/10">
            <IoIosDocument />
          </div>
          <div className="flex flex-col justify-center items-start min-w-0 overflow-hidden">
            <p className="text-sm font-bold">Documents</p>
            <p className="text-xs font-semibold">69 Files</p>
          </div>
        </button>
        <button className="w-full flex items-center p-[7.5px] gap-[10px] cursor-pointer text-[#bbb] hover:text-[#eee] bg-blue-900/75 hover:bg-blue-900 rounded-[10px]">
          <div className="h-[45px] min-w-[45px] w-[45px] shrink-0 rounded-full grid place-items-center text-xl bg-white/10">
            <IoImages />
          </div>
          <div className="flex flex-col justify-center items-start min-w-0 overflow-hidden">
            <p className="text-sm font-bold">Images</p>
            <p className="text-xs font-semibold">69 Files</p>
          </div>
        </button>
        <button className="w-full flex items-center p-[7.5px] gap-[10px] cursor-pointer text-[#bbb] hover:text-[#eee] bg-red-950/75 hover:bg-red-950 rounded-[10px]">
          <div className="h-[45px] min-w-[45px] w-[45px] shrink-0 rounded-full grid place-items-center text-xl bg-white/10">
            <MdVideoLibrary />
          </div>
          <div className="flex flex-col justify-center items-start min-w-0 overflow-hidden">
            <p className="text-sm font-bold">Videos</p>
            <p className="text-xs font-semibold">69 Files</p>
          </div>
        </button>
        <button className="w-full flex items-center p-[7.5px] gap-[10px] cursor-pointer text-[#bbb] hover:text-[#eee] bg-fuchsia-950/75 hover:bg-fuchsia-950 rounded-[10px]">
          <div className="h-[45px] min-w-[45px] w-[45px] shrink-0 rounded-full grid place-items-center text-[22px] bg-white/10">
            <IoMdMusicalNotes />
          </div>
          <div className="flex flex-col justify-center items-start min-w-0 overflow-hidden">
            <p className="text-sm font-bold">Audios</p>
            <p className="text-xs font-semibold">69 Files</p>
          </div>
        </button>
        <button className="w-full flex items-center p-[7.5px] gap-[10px] cursor-pointer text-[#bbb] hover:text-[#eee] bg-emerald-950/75 hover:bg-emerald-950 rounded-[10px]">
          <div className="h-[45px] min-w-[45px] w-[45px] shrink-0 rounded-full grid place-items-center text-xl bg-white/10">
            <RiAndroidFill />
          </div>
          <div className="flex flex-col justify-center items-start min-w-0 overflow-hidden">
            <p className="text-sm font-bold">APKs</p>
            <p className="text-xs font-semibold">69 Files</p>
          </div>
        </button>
        <button className="w-full flex items-center p-[7.5px] gap-[10px] cursor-pointer text-[#bbb] hover:text-[#eee] bg-zinc-900/75 hover:bg-zinc-900 rounded-[10px]">
          <div className="h-[45px] min-w-[45px] w-[45px] shrink-0 rounded-full grid place-items-center text-2xl bg-white/10">
            <HiViewGrid />
          </div>
          <div className="flex flex-col justify-center items-start min-w-0 overflow-hidden">
            <p className="text-sm font-bold">More</p>
            <p className="text-xs font-semibold">69 Files</p>
          </div>
        </button>
      </div>
      <div className="flex items-center w-full text-xs font-bold text-[#aaa] uppercase">
        Recents
      </div>
      <Table />
    </div>
  );
};

export default Archive;
