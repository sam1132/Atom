import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAuth } from "../../../auth/Context";

const ServerLanding = () => {
  const { backendUser } = useAuth();
  const { serverId } = useParams();
  const [server, setServer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServer = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/servers/${serverId}`
        );
        if (!res.ok) {
          throw new Error(
            res.status === 404 ? "Server not found" : "Failed to fetch server"
          );
        }
        const data = await res.json();
        setServer(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServer();
  }, [serverId]);

  if (loading) return <div className="loading-spinner">Loading...</div>;

  return (
    <div className="flex flex-col items-center p-[15px] h-full w-full gap-[15px] text-center">
      <img src={server.banner} alt={server.name} className="h-1/3 max-[625px]:h-1/4 max-[450px]:h-1/5 w-full rounded-[10px] object-cover" />
      <p className="mt-[15px] text-xl max-[450px]:text-lg font-extrabold text-[#bbb]">Welcome, <span className="text-[#eee]">{backendUser?.displayName}</span>! You’re now part of the <span className="text-[#eee]">{server.name}</span> family.</p>
      <p className="text-md font-medium text-[#bbb]">We aim to build a safe and inclusive space where everyone feels welcome to express themselves, share ideas, and form meaningful connections.</p>
    </div>
  );
};

export default ServerLanding;
