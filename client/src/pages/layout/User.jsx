import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "./Sidebar";
import { auth } from "../auth/firebase"; // your config
import { onAuthStateChanged } from "firebase/auth";


const User = () => {
  
useEffect(() => {
    getToken();
  }, []);

const getToken = () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const token = await user.getIdToken();
      console.log("Your Firebase token:", token);
    } else {
      console.log("User not logged in");
    }
  });
};

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="relative flex-grow ml-[12.5px] rounded-[17.5px] bg-[#000000]/67.5 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default User;
