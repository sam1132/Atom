import { useEffect, useState } from "react";

import { BsSearch } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";

const DiscoverServer = () => {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/servers");
        if (!response.ok) throw new Error("Failed to fetch servers");
        const data = await response.json();
        setServers(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchServers();
  }, []);

  return (
    <div className="flex flex-col items-center p-[15px] h-full w-full gap-[15px]">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center h-[45px] shrink-0 text-xs font-bold text-[#aaa] uppercase">
          Discover Server
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

      <div className="relative flex flex-col items-center justify-center p-[15px] min-h-[125px] w-full rounded-[10px] bg-fuchsia-950/75">
        <div className="absolute inset-0 bg-[url('/image.png')] bg-repeat rounded-[10px] mix-blend-multiply opacity-50" />
        <p className="text-2xl font-extrabold text-[#eee] z-1">
          Dicover Your Next Favorite Server
        </p>
        <p className="text-md font-medium text-[#bbb] z-1">
          From learning, to music, to gaming, there's a place for you.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[15px] overflow-y-auto [&::-webkit-scrollbar]:hidden">
        {servers.map((server) => (
          <div
            key={server._id}
            className="relative w-full flex flex-col gap-[5px] bg-black/67.5 rounded-[10px] border-[1px] border-[#2f184b]/75"
          >
            <img
              src={
                server.icon ||
                "https://pm1.aminoapps.com/8181/665e7c6631522e9946805aa7866e4675d74211f0r1-2000-2000v2_uhq.jpg"
              }
              alt={server.name}
              onError={(e) => {
                e.target.src =
                  "https://pm1.aminoapps.com/8181/665e7c6631522e9946805aa7866e4675d74211f0r1-2000-2000v2_uhq.jpg";
              }}
              className="absolute top-[87.5px] left-[18.75px] w-[75px] h-[75px] object-cover border-0 rounded-full"
            />
            <img
              src={
                server.banner ||
                "https://t4.ftcdn.net/jpg/03/86/82/73/360_F_386827376_uWOOhKGk6A4UVL5imUBt20Bh8cmODqzx.jpg"
              }
              alt={server.name}
              onError={(e) => {
                e.target.src =
                  "https://t4.ftcdn.net/jpg/03/86/82/73/360_F_386827376_uWOOhKGk6A4UVL5imUBt20Bh8cmODqzx.jpg";
              }}
              className="h-[125px] w-full object-cover bg-[#2f184b]/37.5 rounded-tl-[10px] rounded-tr-[10px]"
            />
            <p className="text-[#eee] text-sm font-bold pl-[18.75px] mt-[37.5px]">
              {server.name}
            </p>
            <div className="flex items-center gap-[2.5px] pl-[18.75px] pb-[12.5px] text-[#bbb] ">
              <GoDotFill />
              <p className="text-xs font-semibold">
                {server.members?.length || 1} Members
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverServer;
