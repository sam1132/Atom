import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

import { useAuth } from "../auth/Context";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const User = () => {
  // const [userData, setUserData] = useState();
  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const apiResponse = await fetch("http://localhost:3000/api/auth/user", {
  //         method: "GET",
  //         credentials: "include",
  //       });

  //       if (!apiResponse.ok) {
  //         throw new Error("Unauthorized");
  //       }
  //       const responseData = await apiResponse.json();
  //       setUserData(responseData);
  //     } catch (error) {
  //       toast.error(error);
  //     }
  //   };
  //   getUser();
  // }, []);
  // if (!userData || !userData.success) {
  //   return <p>Loading</p>;
  // }

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="relative flex-grow ml-[12.5px] rounded-[17.5px] bg-[#000000]/67.5 overflow-hidden">
        <Outlet />
      </div>
      {/* <p>Email: {userData.user.email}</p> */}
      {/* <p>Avatar: {userData.user.avatar}</p> */}
    </div>
  );
};

export default User;
