import { useState } from "react";
import { NavLink } from "react-router-dom";
import user1 from "../assets/avatar-atom-1.avif";
import {
  FaComments,
  FaHashtag,
  FaSearch,
  FaChevronUp,
  FaChevronDown,
  FaPhoneAlt,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { TbLogout2 } from "react-icons/tb";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { GrResources } from "react-icons/gr";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdEmojiEvents,
  MdOutlineMail,
} from "react-icons/md";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontSize: theme.typography.pxToRem(12),
  },
}));
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [channelOpen, setChannelOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const channels = [
    { cname: "General", id: 1 },
    { cname: "Random", id: 2 },
    { cname: "Development", id: 3 },
    { cname: "Design", id: 4 },
    { cname: "Marketing", id: 5 },
  ];
  return (
    <>
      <div
        className={`${
          isOpen ? "w-64 p-4" : "w-16 p-3"
        } h-screen  border-r border-white bg-gray-900  flex flex-col transition-all duration-300 fixed z-50`}
      >
        <div className="flex items-center justify-between mb-4">
          {isOpen ? (
            <h1 className="text-white md:mt-3 md:text-3xl font-semibold">
              Atom
            </h1>
          ) : (
            ""
          )}
          <button
            className="md:mt-2 text-xl p-2 text-gray-600  self-end"
            onClick={() => {
              setIsOpen(!isOpen);
              setChannelOpen(false);
            }}
          >
            {isOpen ? (
              <MdKeyboardDoubleArrowLeft className="md:text-2xl text-white cursor-pointer" />
            ) : (
              <HiOutlineMenuAlt3 className="md:text-2xl text-white cursor-pointer" />
            )}
          </button>
        </div>
        {/* Search Bars */}
        {isOpen && (
          <div className="mb-4">
            <div className="relative mb-2">
              <FaSearch className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                placeholder="Search User..."
                className="w-full p-2 pl-10 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Sidebar Items */}
        <nav className=" flex-1">
          <ul className="space-y-2">
            <li>
              <NavLink to="/events">
              <div className="flex items-center p-2 rounded-lg cursor-pointer text-gray-700">
                {!isOpen ? (
                  <BootstrapTooltip
                    title="Events"
                    arrow
                    placement="right-start"
                  >
                    <span>
                      <MdEmojiEvents className="text-xl md:text-2xl text-gray-100" />
                    </span>
                  </BootstrapTooltip>
                ) : (
                  <MdEmojiEvents className="text-xl md:text-2xl text-gray-100" />
                )}

                {isOpen && (
                  <span className="ml-3 text-xl text-white">Events</span>
                )}
              </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/chat">
              <div className="flex items-center p-2 rounded-lg cursor-pointer text-gray-700">
                {!isOpen ? (
                  <BootstrapTooltip title="Chats" arrow placement="right-start">
                    <span>
                      <FaComments className="text-xl md:text-2xl text-white" />
                    </span>
                  </BootstrapTooltip>
                ) : (
                  <FaComments className="text-xl md:text-2xl text-white" />
                )}
                {isOpen && (
                  <span className="ml-3 text-xl text-white">Chat</span>
                )}
              </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/resources">
              <div className="flex items-center p-2 rounded-lg cursor-pointer text-gray-700">
                {!isOpen ? (
                  <BootstrapTooltip
                    title="Resources"
                    arrow
                    placement="right-start"
                  >
                    <span>
                      <GrResources className="text-xl md:text-2xl text-white" />
                    </span>
                  </BootstrapTooltip>
                ) : (
                  <GrResources className="text-xl md:text-2xl text-white" />
                )}
                {isOpen && (
                  <span className="ml-3 text-xl text-white">Resources</span>
                )}
              </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/events">
              <div
                className="flex items-center p-2  rounded-lg cursor-pointer text-gray-700"
                onClick={() => setChannelOpen(!channelOpen)}
              >
                {!isOpen ? (
                  <BootstrapTooltip
                    title="Channels"
                    arrow
                    placement="right-start"
                  >
                    <span>
                      <FaHashtag className="text-xl md:text-2xl text-white" />
                    </span>
                  </BootstrapTooltip>
                ) : (
                  <FaHashtag className="text-xl md:text-2xl text-white" />
                )}

                {isOpen && (
                  <span className="ml-3 text-xl text-white ">Channels</span>
                )}
                {isOpen &&
                  (channelOpen ? (
                    <FaChevronUp className="ml-16 text-white" />
                  ) : (
                    <FaChevronDown className="ml-16 text-white" />
                  ))}
              </div>
              {isOpen && channelOpen && (
                <ul className="ml-12 border-l mt-2 border-gray-600 space-y-1">
                  {channels.map((channel, index) => (
                    <li
                      key={index}
                      className="p-2 rounded-lg cursor-pointer text-gray-100 dark:text-gray-300"
                    >
                      # {channel.cname}
                    </li>
                  ))}
                </ul>
              )}
            </NavLink>
            </li>
            <li>
              <div className="cursor-pointer ml-1 md:ml-0">
                <BootstrapTooltip title="Profile" arrow placement="right">
                  <Avatar
                    alt="Remy Sharp"
                    src={user1}
                    sx={{
                      width: { xs: 28, sm: 32, md: 36, lg: 38 },
                      height: { xs: 28, sm: 32, md: 36, lg: 38 },
                    }}
                    onClick={() => setProfileOpen(true)}
                  />
                </BootstrapTooltip>
              </div>
            </li>
          </ul>
        </nav>
        {/* Logout Button */}
        <button className="flex items-center p-2 rounded-lg cursor-pointer mb-14 md:mb-3 text-gray-700">
          {!isOpen ? (
            <BootstrapTooltip title="Logout" arrow placement="right-start">
              <span>
                <TbLogout2 className="text-xl md:text-2xl text-white" />
              </span>
            </BootstrapTooltip>
          ) : (
            <TbLogout2 className="text-xl md:text-2xl text-white" />
          )}
          {isOpen && (
            <span className="ml-3 text-xl text-white font-semibold">
              Logout
            </span>
          )}
        </button>
      </div>
      {/* profile sidebar */}
      {profileOpen && (
        <aside>
          <div
            className={
              "fixed top-0 right-0 w-74 md:w-[25rem] h-screen mt-[3.8rem] md:mt-[4.5rem] border-l border-gray-700 p-4 z-50 bg-gray-900 transform transition-all duration-300"
            }
          >
            <div className="flex items-center space-x-4 mb-9">
              <Avatar
                alt="Remy Sharp"
                src={user1}
                sx={{ width: 56, height: 56 }}
              />
              <div className="text-white">
                <h2 className="text-lg font-semibold">User Name</h2>
                <p className="text-sm text-gray-400">@username</p>
              </div>
              <div className="top-0 left-0 md:text-2xl text-white ">
                <MdKeyboardDoubleArrowRight
                  className="cursor-pointer"
                  onClick={() => setProfileOpen(false)}
                />
              </div>
            </div>
            {/* Additional profile information can go here */}
            <Accordion
              defaultExpanded
              sx={{
                backgroundColor: "rgba(255, 255, 255,0.1)",
                color: "white",
                borderRadius: "8px",
              }}
            >
              <AccordionSummary
                expandIcon={<FaChevronDown className="text-white" />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography component="span" sx={{ fontSize: { md: 20 } }}>
                  Contact
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex justify-between items-center ">
                  <p className="flex items-center ">
                    {
                      <MdOutlineMail className=" text-xl md:text-2xl text-gray-500 mr-2" />
                    }
                    <span>Email</span>
                  </p>
                  <p className=" text-sm md:mt-0 md:text-[1rem]">
                    sam113273@gmail.com
                  </p>
                </div>
                <div className="flex justify-between items-center mt-2 ml-1">
                  <p className="flex items-center ">
                    {<FaPhoneAlt className="md:text-xl text-gray-500 mr-2" />}
                    <span>Phone</span>
                  </p>
                  <p className=" text-sm md:mt-0 md:text-[1rem]">
                    +91 1234567890
                  </p>
                </div>
                <div className="flex justify-between items-center mt-2 ">
                  <p className="flex items-center ">
                    {
                      <CiCalendar className=" text-xl md:text-2xl text-gray-500 mr-2" />
                    }
                    <span>Created</span>
                  </p>
                  <p className=" text-sm md:mt-0 md:text-[1rem]">
                    sep 12, 2023
                  </p>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                backgroundColor: "rgba(255, 255, 255,0.1)",
                color: "white",
                borderRadius: "8px",
                marginTop: "1rem",
              }}
            >
              <AccordionSummary
                expandIcon={<FaChevronDown className="text-white" />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography component="span" sx={{ fontSize: { md: 20 } }}>
                  Current Events
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex justify-between">
                  <p className="flex items-center ">
                    {<MdEmojiEvents className="text-2xl text-gray-500 mr-2" />}
                    <span>Geek lord</span>
                  </p>
                  Java Script DSA
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                backgroundColor: "rgba(255, 255, 255,0.1)",
                color: "white",
                borderRadius: "8px",
                marginTop: "1rem",
              }}
            >
              <AccordionSummary
                expandIcon={<FaChevronDown className="text-white" />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography component="span" sx={{ fontSize: { md: 20 } }}>
                  Previous Events
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex justify-between">
                  <p className="flex items-center ">
                    {<MdEmojiEvents className="text-2xl text-gray-500 mr-2" />}
                    <span>Geek lord</span>
                  </p>
                  Java DSA
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                backgroundColor: "rgba(255, 255, 255,0.1)",
                color: "white",
                borderRadius: "8px",
                marginTop: "1rem",
              }}
              expanded={true}
            >
              <AccordionSummary
                expandIcon={<FaChevronDown className="text-white" />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography component="span" sx={{ fontSize: { md: 20 } }}>
                  Social Info
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex justify-between items-center">
                  <p className="flex items-center ">
                    {
                      <FaLinkedinIn className=" text-xl md:text-2xl text-gray-500 mr-2" />
                    }
                    <span>LinkedIn</span>
                  </p>
                  <p>Sameer sharma</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="flex items-center ">
                    {
                      <FaGithub className=" text-xl md:text-2xl text-gray-500 mr-2" />
                    }
                    <span>Github</span>
                  </p>
                  <p>Sam1132</p>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
