import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaBell } from "react-icons/fa";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { TbHash, TbVideoFilled } from "react-icons/tb";

import { ServerSchema } from "../../../auth/schema";
import { useAuth } from "../../../auth/Context";

const CreateChannel = ({ onClose, serverId, onSuccess }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("text-channel");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ServerSchema),
    defaultValues: {
      name: "",
    },
  });

  const channelIcons = {
    "text-channel": <TbHash className="text-xl text-[#bbb]" />,
    "Event-channel": <FaBell className="text-xl text-[#bbb]" />,
    "video-channel": <TbVideoFilled className="text-xl text-[#bbb]" />,
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const token = await currentUser.getIdToken();
      const response = await fetch(
        `http://localhost:3000/api/servers/${serverId}/channels`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: data.name,
            type: selectedType.split("-")[0].toUpperCase(),
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create channel");
      }
      onSuccess?.();
      onClose();
      toast.success("Channel created successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/25 backdrop-blur-[2.5px] flex items-center justify-center z-50">
      <div className="relative flex flex-col items-center gap-[18.75px] w-[325px] bg-neutral-950 border-[1px] border-[#2f184b]/50 rounded-[10px] p-[18.75px]">
        <RxCross2
          onClick={onClose}
          className="absolute top-[12.5px] right-[12.5px] cursor-pointer text-[#bbb] hover:text-[#ddd] text-md max-[500px]:text-sm"
        />
        <p className="text-[#bbb] text-xs font-bold uppercase">
          Create a New Channel
        </p>
        <p className="mt-[-6.25px] text-[#aaa] text-xs text-center font-semibold">
          Set up a space for your community to chat, share, or collaborate.
        </p>
        <div className="w-full mt-[18.75px]">
          <select
            onChange={(e) => setSelectedType(e.target.value)}
            value={selectedType}
            className="h-[37.5px] w-full px-2 rounded-[7.5px] bg-[#2f184b]/37.5 border-[1px] border-[#2f184b]/75 focus:outline-none text-sm font-normal text-[#eee]"
          >
            <option value="text-channel">text-channel</option>
            <option value="Event-channel">Event-channel</option>
            <option value="video-channel">video-channel</option>
          </select>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center gap-[18.75px]"
        >
          <div className="flex items-center w-full bg-[#2f184b]/37.5 text-[#eee] rounded-[7.5px]">
            <div className="h-[37.5px] w-[37.5px] flex items-center justify-center shrink-0">
              {channelIcons[selectedType]}
            </div>
            <input
              type="text"
              placeholder="What should we call your channel?"
              {...register("name")}
              className="h-[37.5px] w-full py-3 focus:outline-none text-sm font-normal"
            />
          </div>
          {errors.name && (
            <p className="text-red-600 text-[12.5px] font-semibold w-full px-1 mt-[-18.75px]">
              {errors.name.message}
            </p>
          )}

          <button className="cursor-pointer flex items-center justify-center h-[37.5px] w-full text-[#bbb] hover:text-[#ddd] bg-purple-950/75 hover:bg-purple-950 rounded-[7.5px]">
            {loading ? (
              <div className="h-[20px] w-[20px] border-3 border-t-white/75 border-black/25 rounded-full animate-spin"></div>
            ) : (
              <p className="text-xs font-bold">Create Channel</p>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateChannel;
