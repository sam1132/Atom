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
} from '@mui/material';
import React ,{ useState,forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const DirectMessages = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="flex items-center justify-between p-[15px] mt-[2.5px] text-[#aaa] text-sm">
        <div className="font-bold">Direct Messages</div>
        <FaPlus className="cursor-pointer hover:text-[#eee]" />
      </div>
      <nav className=" flex flex-col w-full py-0 px-[10px] gap-[5px]">
        <div className="hover:bg-[#2f184b] rounded-[7.5px] transition-all duration-250 flex items-center justify-between py-0 px-[10px] w-full h-10 text-[#bbb] hover:text-[#eee] text-sm">
          <Link to="/user/message">
            <div className="flex items-center gap-2 cursor-pointer">
              <img src="/icon.svg" className="w-6.25" />
              <p className="font-semibold">Jaspreet</p>
            </div>
          </Link>
          <div>
            <RxCross2 className="cursor-pointer" onClick={()=>{setOpen(true)}} />
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
                Are you sure you want to remove this user?
                This action is permanent and cannot be undone.
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
