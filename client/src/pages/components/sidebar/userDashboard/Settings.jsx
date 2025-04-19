import ChangeAvatar from "./ChangeAvatar";
import toast from "react-hot-toast";
import { useState } from "react";

import { TbCopy, TbProgressCheck } from "react-icons/tb";

import { useAuth } from "../../../auth/Context";

const Settings = () => {
  const { currentUser, backendUser, setBackendUser } = useAuth();
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRemoveAvatar = async () => {
    try {
      setLoading(true);
      const token = await currentUser.getIdToken();
      const updateRes = await fetch(
        `http://localhost:3000/api/users/${currentUser.uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            avatar:
              "https://i.pinimg.com/236x/08/f6/4a/08f64a7cb64b67167d6b5e75429b26bb.jpg",
          }),
        }
      );
      if (!updateRes.ok) throw new Error("Failed to remove avatar");
      const updatedUser = await updateRes.json();
      setBackendUser(updatedUser);
      toast.success("Avatar reset to default!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyShortId = () => {
    navigator.clipboard.writeText(backendUser?.shortId);
    toast.success("Copied to clipboard!");
  };

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
              placeholder={backendUser?.displayName}
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
              onClick={() => setShowAvatarModal(true)}
              className="cursor-pointer flex items-center justify-center h-[37.5px] w-full text-[#bbb] hover:text-[#eee] bg-purple-950/75 hover:bg-purple-950 rounded-[10px]"
            >
              <p className="text-xs font-bold">Change Avatar</p>
            </button>
            <button
              onClick={handleRemoveAvatar}
              disabled={loading}
              className="cursor-pointer flex items-center justify-center h-[37.5px] w-full text-[#bbb] hover:text-[#eee] bg-white/5 hover:underline rounded-[10px]"
            >
              <p className="text-xs font-bold">Remove Avatar</p>
            </button>
          </div>
          {showAvatarModal && (
            <ChangeAvatar
              currentUser={currentUser}
              setBackendUser={setBackendUser}
              onClose={() => setShowAvatarModal(false)}
            />
          )}
        </div>

        <div className="relative w-full flex flex-col gap-[5px] bg-[#2f184b]/37.5 rounded-[10px] border-[1px] border-[#2f184b]/75">
          <img
            src={backendUser?.avatar}
            alt={backendUser?.displayName}
            className="absolute top-[18.75px] left-[18.75px] w-[75px] h-[75px] object-cover border-0 rounded-full "
            onError={(e) => {
              e.target.src =
                "https://i.pinimg.com/236x/08/f6/4a/08f64a7cb64b67167d6b5e75429b26bb.jpg";
            }}
          />
          <div className="h-[56.25px] w-full bg-black/67.5 rounded-tl-[10px] rounded-tr-[10px]"></div>
          <p className="text-[#eee] text-sm font-bold pl-[18.75px] mt-[37.5px]">
            {backendUser?.displayName}
          </p>
          <div className="flex items-center gap-[7.5px] pl-[18.75px] pb-[12.5px] text-[#bbb] ">
            <p className="text-xs font-semibold">{backendUser?.shortId}</p>
            <TbCopy
              onClick={handleCopyShortId}
              className="text-sm cursor-pointer hover:text-[#eee]"
            />
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
