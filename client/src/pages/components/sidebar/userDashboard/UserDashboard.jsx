import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../../auth/Context";
import { useState } from "react";

import { BsCalendar2Day } from "react-icons/bs";
import { BsFolder2Open } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import { PiGear } from "react-icons/pi";
import { TbDoorExit } from "react-icons/tb";
import { TbListCheck } from "react-icons/tb";

const UserDashboard = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser, logout } = useAuth() || {};

  const handleLogout = async () => {
    toast.dismiss();
    try {
      setLoading(true);
      await logout();
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className=" flex flex-col h-full w-full py-[10px] px-[10px] gap-[5px]">
      <Link to="/user/settings">
        <div className="hover:bg-[#2f184b] rounded-[7.5px] transition-all duration-250 flex items-center justify-between py-0 px-[10px] w-full h-10 cursor-pointer text-[#bbb] hover:text-[#eee]">
          <p className="text-sm font-semibold">Settings</p>
          <PiGear className="text-xl" />
        </div>
      </Link>
      <Link to="/user/archive">
        <div className="hover:bg-[#2f184b] rounded-[7.5px] transition-all duration-250 flex items-center justify-between py-0 px-[10px] w-full h-10 cursor-pointer text-[#bbb] hover:text-[#eee]">
          <p className="text-sm font-semibold">Archive</p>
          <BsFolder2Open className="text-xl" />
        </div>
      </Link>
      <Link to="/user/docket">
        <div className="hover:bg-[#2f184b] rounded-[7.5px] transition-all duration-250 flex items-center justify-between py-0 px-[10px] w-full h-10 cursor-pointer text-[#bbb] hover:text-[#eee]">
          <p className="text-sm font-semibold">Docket</p>
          <TbListCheck className="text-xl" />
        </div>
      </Link>
      <Link to="/user/planner">
        <div className="hover:bg-[#2f184b] rounded-[7.5px] transition-all duration-250 flex items-center justify-between py-0 px-[10px] w-full h-10 cursor-pointer text-[#bbb] hover:text-[#eee]">
          <p className="text-sm font-semibold">Planner</p>
          <BsCalendar2Day className="text-lg" />
        </div>
      </Link>
      <Link to="/user/mind-muffins">
        <div className="hover:bg-[#2f184b] rounded-[7.5px] transition-all duration-250 flex items-center justify-between py-0 px-[10px] w-full h-10 cursor-pointer text-[#bbb] hover:text-[#eee]">
          <p className="text-sm font-semibold">Mind Muffins</p>
          <CgNotes className="text-xl" />
        </div>
      </Link>
      {currentUser && (
        <button
          disabled={loading}
          onClick={handleLogout}
          className="mt-auto hover:bg-red-900/25 rounded-[7.5px] transition-all duration-250 flex items-center justify-between py-0 px-[10px] w-full h-10 cursor-pointer text-red-600/75 hover:text-red-600"
        >
          <p className="text-sm font-semibold">
            {loading ? "Logging out..." : "Logout"}
          </p>
          <TbDoorExit className="text-xl" />
        </button>
      )}
    </nav>
  );
};

export default UserDashboard;
