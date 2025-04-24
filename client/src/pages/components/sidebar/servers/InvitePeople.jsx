import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import { BsLink45Deg } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { TbCopy } from "react-icons/tb";

const CreateChannel = ({ onClose }) => {
  const { serverId } = useParams();
  const inviteLink = `${window.location.origin}/user/server/${serverId}`;

  const handleCopyServerLink = () => {
    navigator.clipboard.writeText(inviteLink);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 bg-black/25 backdrop-blur-[2.5px] flex items-center justify-center z-50">
      <div className="relative flex flex-col items-center gap-[18.75px] w-[325px] bg-neutral-950 border-[1px] border-[#2f184b]/50 rounded-[10px] p-[18.75px]">
        <RxCross2
          onClick={onClose}
          className="absolute top-[12.5px] right-[12.5px] cursor-pointer text-[#bbb] hover:text-[#ddd] text-md max-[500px]:text-sm"
        />
        <p className="text-[#bbb] text-xs font-bold uppercase">
          Grow your Community
        </p>
        <p className="mt-[-6.25px] text-[#aaa] text-xs text-center font-semibold">
          Invite users to your server by sharing this code.
        </p>
        <div className="w-full flex items-center gap-[7.5px]">
          <div className="w-full flex items-center bg-[#2f184b]/37.5 text-[#bbb] rounded-[7.5px] border-[1px] border-[#2f184b]/75 overflow-hidden">
            <div className="h-[37.5px] w-[37.5px] flex items-center justify-center shrink-0">
              <BsLink45Deg className="text-xl" />
            </div>
            <p className="text-xs font-semibold">{inviteLink}</p>
          </div>
          <button
            onClick={handleCopyServerLink}
            className="flex items-center justify-center h-[37.5px] w-[37.5px] shrink-0 rounded-[7.5px] text-xl text-[#bbb] hover:text-[#eee] bg-purple-950/75 hover:bg-purple-950 cursor-pointer"
          >
            <TbCopy />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateChannel;
