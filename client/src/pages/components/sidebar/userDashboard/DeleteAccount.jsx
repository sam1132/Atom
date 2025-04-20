import { useState } from "react";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";

const DeleteAccount = ({ onClose, onConfirm, loading, provider }) => {
  const [password, setPassword] = useState("");

  const renderAuthMethod = () => {
    if (provider === "password") {
      return (
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-[37.5px] w-full px-3 py-3 rounded-[7.5px] bg-white/5 border-[1px] border-white/5 focus:outline-none text-sm font-normal text-[#eee]"
        />
      );
    }
    return (
      <div className="flex w-full">
        {provider === "google.com" && (
          <button
            onClick={() => onConfirm(null, "google")}
            className="cursor-pointer flex items-center justify-center gap-1 w-full h-[37.5px] bg-white/5 rounded-[7.5px] text-[#bbb] hover:text-[#eee]"
          >
            <FcGoogle className="!h-[15px] !w-[15px]" />
            <span className="text-xs font-bold">Verify</span>
          </button>
        )}

        {provider === "github.com" && (
          <button
            onClick={() => onConfirm(null, "github")}
            className="cursor-pointer flex items-center justify-center gap-1 w-full h-[37.5px] bg-white/5 rounded-[7.5px] text-[#bbb] hover:text-[#eee]"
          >
            <FaGithub className="!h-[15px] !w-[15px]" />
            <span className="text-xs font-bold">Verify</span>
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/25 backdrop-blur-[2.5px] flex items-center justify-center z-50">
      <div className="relative flex flex-col items-center gap-[18.75px] w-[325px] bg-neutral-950 border-[1px] border-[#2f184b]/50 rounded-[10px] p-[18.75px]">
        <RxCross2
          onClick={onClose}
          className="absolute top-[12.5px] right-[12.5px] cursor-pointer text-[#bbb] hover:text-[#eee] text-md max-[500px]:text-sm"
        />
        <p className="text-[#bbb] text-xs font-bold uppercase">
          Delete Confirmation Required
        </p>
        <p className="text-[#aaa] text-xs text-center font-semibold">
          This action is permanent and cannot be undone. You will no longer have
          access to any features or services associated with your account.
        </p>
        {renderAuthMethod()}
        <button
          onClick={() => (provider === "password" ? onConfirm(password) : null)}
          disabled={loading || (provider === "password" && !password)}
          className="cursor-pointer flex items-center justify-center h-[37.5px] w-full text-red-600/75 hover:text-red-600 bg-red-900/25 rounded-[7.5px]"
        >
          {loading ? (
            <div className="h-[20px] w-[20px] border-3 border-t-white/75 border-black/25 rounded-full animate-spin"></div>
          ) : (
            <p className="text-xs font-bold">Delete Account</p>
          )}
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;
