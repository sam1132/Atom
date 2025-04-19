import { BsSearch } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

const NewConversation = () => {
  return (
    <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50">
      <div className="relative flex flex-col items-center justify-center w-full max-w-[625px] gap-[10px] p-[18.75px] pt-[25px] bg-[#2f184b]/37.5 rounded-[10px]">
        <RxCross2 className="absolute top-[12.5px] right-[12.5px] cursor-pointer text-[#bbb] hover:text-[#ddd] text-md max-[500px]:text-sm" />
        <p className="text-[#eee] text-xl max-[500px]:text-[12.5px] font-bold ">
          Connect with Others
        </p>
        <p className="text-[#bbb] text-sm max-[500px]:text-[10px] font-bold ">
          Enter a user ID to start a new conversation
        </p>
        <form className="w-full flex items-center justify-center gap-[10px] mt-[15px] max-[500px]:flex-col">
          <div className="h-[37.5px] w-3/4 max-[500px]:w-full rounded-[7.5px] bg-[#2f184b]/37.5 border-[1px] border-[#2f184b]/75 flex items-center">
            <div className="border-0 h-[37.5px] w-[37.5px] grid place-items-center text-[#bbb] text-sm">
              <BsSearch />
            </div>
            <input
              type="text"
              className="flex-1 py-3 border:none focus:outline-none text-sm font-normal text-[#eee] bg-transparent"
              placeholder="Search by User ID..."
            />
          </div>
          <button
            type="submit"
            // disabled={loading}
            className="cursor-pointer flex items-center justify-center h-[37.5px] w-1/4 max-[500px]:w-full text-[#bbb] hover:text-[#ddd] bg-purple-950/75 hover:bg-purple-950 rounded-[7.5px]"
          >
            <p className="text-xs font-bold">Connect</p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewConversation;
