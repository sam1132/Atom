import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

const DirectMessages = () => {
  return (
    <>
      <div className="flex items-center justify-between p-[15px] mt-[2.5px] text-[#aaa] text-sm">
        <div className="font-bold">Direct Messages</div>
        <FaPlus className="cursor-pointer hover:text-[#eee]" />
      </div>
      <nav className=" flex flex-col w-full py-0 px-[10px] gap-[5px]">
        <div className="hover:bg-[#2f184b] rounded-[7.5px] transition-all duration-250 flex items-center justify-between py-0 px-[10px] w-full h-10 text-[#bbb] hover:text-[#eee] text-sm">
          <Link to="/user/message">
            <div className="flex items-center gap-2 cursor-pointer">
              <img src="/icon.svg" className="w-6.25" />
              <p className="font-semibold">Sameer</p>
            </div>
          </Link>
          <div>
            <RxCross2 className="cursor-pointer" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default DirectMessages;
