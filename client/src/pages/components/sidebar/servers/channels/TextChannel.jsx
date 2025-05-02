import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { BsEmojiLaughingFill } from "react-icons/bs";
import { FaCirclePlus } from "react-icons/fa6";
import { HiGif } from "react-icons/hi2";
import { TbHash } from "react-icons/tb";

const TextChannel = () => {
  const { serverId, channelId } = useParams();
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/servers/${serverId}/channels/${channelId}`
        );
        if (!res.ok) throw new Error("Failed to fetch channel");
        const data = await res.json();
        setChannel(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchChannel();
  }, [serverId, channelId]);

  if (loading) return <div className="loading-spinner">Loading channel...</div>;

  return (
    <div className="absolute top-0 bottom-0 flex flex-col items-center p-[15px] w-full">
      <div className="h-[45px] w-full flex items-center text-[#bbb] gap-[5px]">
        <TbHash className="text-xl" />
        <p className="p-0 text-sm font-bold">{channel.name}</p>
      </div>

      <div className="mt-auto h-[45px] w-full rounded-[10px] bg-[#2f184b]/37.5 border-[1px] border-[#2f184b]/75 flex items-center">
        <button className="border-0 cursor-pointer w-[46px] h-[45px] grid place-items-center text-[#bbb] hover:text-[#eee] text-lg shrink-0">
          <FaCirclePlus />
        </button>
        <input
          type="text"
          className="flex-1 py-3 border:none focus:outline-none text-sm font-normal text-[#eee] bg-transparent"
          placeholder={`Message #${channel.name}`}
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

export default TextChannel;
