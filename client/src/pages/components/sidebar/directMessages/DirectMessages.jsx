import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slide,
} from "@mui/material";
import React, { useState, forwardRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useAuth } from "../../../auth/Context";
import axios from "axios";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DirectMessages = () => {
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [popup, setPopup] = useState(false);
  const [Search, setSearch] = useState("");
  const [chat, setChat] = useState([]);

  const handleFind = async (e) => {
    e.preventDefault();
    try {
      const token = await currentUser.getIdToken();
      const response = await axios.get(
        `http://localhost:3000/api/users/search/${Search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setChat(response.data);
      setSearch("");
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="flex items-center justify-between p-[15px] mt-[2.5px] text-[#aaa] text-sm">
        <div className="font-bold">Direct Messages</div>
        <FaPlus
          className="cursor-pointer hover:text-[#eee]"
          onClick={() => setPopup(!popup)}
        />
        {popup && (
          <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50">
            <div className="relative flex flex-col items-center justify-center w-full max-w-[625px] gap-[10px] p-[18.75px] pt-[25px] bg-[#2f184b]/37.5 rounded-[10px]">
              <RxCross2
                className="absolute top-[12.5px] right-[12.5px] cursor-pointer text-[#bbb] hover:text-[#ddd] text-md max-[500px]:text-sm"
                onClick={() => setPopup(false)}
              />
              <p className="text-[#eee] text-xl max-[500px]:text-[12.5px] font-bold ">
                Connect with Others
              </p>
              <p className="text-[#bbb] text-sm max-[500px]:text-[10px] font-bold ">
                Enter a user ID to start a new conversation
              </p>
              <form className="w-full flex items-center justify-center gap-[10px] mt-[15px] max-[500px]:flex-col">
                <div className="h-[37.5px] w-3/4 max-[500px]:w-full rounded-[7.5px] bg-[#2f184b]/37.5 border-[1px] border-[#2f184b]/75 flex items-center">
                  <div className="border-0 h-[37.5px] w-[37.5px] grid place-items-center text-[#bbb] text-sm">
                    <BsSearch />
                  </div>
                  <input
                    type="text"
                    className="flex-1 py-3 border:none focus:outline-none text-sm font-normal text-[#eee] bg-transparent"
                    placeholder="Search by User ID..."
                    value={Search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  onClick={handleFind}
                  // disabled={loading}
                  className="cursor-pointer flex items-center justify-center h-[37.5px] w-1/4 max-[500px]:w-full text-[#bbb] hover:text-[#ddd] bg-purple-950/75 hover:bg-purple-950 rounded-[7.5px]"
                >
                  <p className="text-xs font-bold">Connect</p>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <nav className=" flex flex-col w-full py-0 px-[10px] gap-[5px]">
        <div className="hover:bg-[#2f184b] rounded-[7.5px] transition-all duration-250 flex items-center justify-between py-0 px-[10px] w-full h-10 text-[#bbb] hover:text-[#eee] text-sm">
          {chat.map((chatItem) => (
            <Link
              key={chatItem.shortId}
              to={`/user/message/${chatItem.shortId}`}
            >
              <div className="flex items-center gap-2 cursor-pointer">
                <img src={chatItem.avatar} className="w-6.25" alt="icon" />
                <p className="font-semibold">
                  {chatItem.displayName || "Unknown"}
                </p>
              </div>
            </Link>
          ))}
          <div>
            <RxCross2
              className="cursor-pointer"
              onClick={() => {
                setOpen(true);
              }}
            />
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"Confirm User Removal"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Are you sure you want to remove this user? This action is
                  permanent and cannot be undone.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose}>Agree</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </nav>
    </>
  );
};

export default DirectMessages;
