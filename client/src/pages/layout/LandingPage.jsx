import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { BsGithub, BsLinkedin, BsTwitterX } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import { LuBell } from "react-icons/lu";
import { RiArrowRightSLine } from "react-icons/ri";
import { TbHash, TbListCheck, TbServer2, TbVideo } from "react-icons/tb";

const LandingPage = () => {
  return (
    <div className="relative flex flex-col items-center gap-[75px] h-full w-full overflow-y-auto [&::-webkit-scrollbar]:hidden">
      <div className="h-[50px] flex items-center justify-between px-[6.25px] w-full bg-[#000000]/67.5 rounded-[12.5px] shrink-0">
        <Link
          to="/"
          className="flex items-center justify-center pl-[7.5px] gap-[5px] cursor-pointer"
        >
          <p className="text-[22.5px] bg-gradient-to-r from-amber-400 to-amber-500 text-transparent bg-clip-text font-bold opacity-87.5">
            АT
          </p>
          <img src="/icon.svg" alt="atom logo" className="w-[22.5px]" />
          <p className="text-[22.5px] bg-gradient-to-r from-amber-500 to-amber-600 text-transparent bg-clip-text font-bold opacity-87.5">
            Ѫ
          </p>
        </Link>
        <nav className="hidden sm:flex items-center gap-8 text-[#aaa] text-sm font-semibold">
          <a href="#features" className="hover:text-[#ccc]">
            Features
          </a>
          <a href="#productivity" className="hover:text-[#ccc]">
            Productivity
          </a>
          <Link href="#" className="hover:text-[#ccc]">
            About
          </Link>
        </nav>
        <div className="flex items-center justify-center gap-[12.5px]">
          <Link
            to="/login"
            className="text-[#aaa] hover:text-[#ccc] hover:underline text-sm font-semibold"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="cursor-pointer flex items-center justify-center h-[37.5px] w-[100px] text-[#bbb] hover:text-[#ddd] bg-purple-950/75 hover:bg-purple-950 rounded-[7.5px]"
          >
            <div className="text-sm font-semibold">Get Started</div>
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-[12.5px] text-center overflow-x-clip">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 text-transparent bg-clip-text">
          Connect, Collaborate, Create
        </h1>
        <p className="text-xl text-[#bbb]">
          A modern platform for communities and teams to communicate,
          collaborate, and boost productivity all in one place.
        </p>
        <motion.div
          style={{
            rotateX: 15,
            transformPerspective: "750px",
          }}
          className="flex justify-center"
        >
          <img src="/screenshot.png" alt="product screenshot" className="max-w-[87.5%]" />
        </motion.div>
      </div>

      <div
        id="features"
        className="w-full flex flex-col items-center justify-center gap-[12.5px] text-center"
      >
        <h2 className="text-[#eee] text-3xl md:text-4xl font-bold">
          Powerful Communication Features
        </h2>
        <p className="text-[#bbb]">
          Everything you need to build and grow your community or team in one
          integrated platform.
        </p>
        <div className="grid md:grid-cols-3 w-full gap-[12.5px]">
          <div className="flex flex-col gap-[7.5px] p-[25px] w-full bg-[#000000]/50 rounded-[12.5px] shrink-0 border border-stone-900 hover:border-stone-700">
            <div className="flex items-center justify-center w-fit p-[6.25px] bg-purple-950/50 rounded-[7.5px]">
              <TbServer2 className="h-[31.25px] w-[31.25px] text-purple-600/75" />
            </div>
            <h3 className="text-[#eee] text-left text-xl font-bold">
              Create & Discover Servers
            </h3>
            <p className="text-[#bbb] text-left">
              Build your own community or join existing ones. Organize servers
              around topics, teams, or interests.
            </p>
            <Link className="flex items-end gap-[2.5px] text-amber-600 hover:text-amber-500 text-sm">
              <p>Learn More</p>
              <RiArrowRightSLine className="mb-[0.5px]" />
            </Link>
          </div>
          <div className="flex flex-col gap-[7.5px] p-[25px] w-full bg-[#000000]/50 rounded-[12.5px] shrink-0 border border-stone-900 hover:border-stone-700">
            <div className="flex items-center justify-center w-fit p-[6.25px] bg-blue-950/50 rounded-[7.5px]">
              <TbHash className="h-[31.25px] w-[31.25px] text-blue-600/75" />
            </div>
            <h3 className="text-[#eee] text-left text-xl font-bold">
              Text & Video Channels
            </h3>
            <p className="text-[#bbb] text-left">
              Communicate through text channels for persistent conversations or
              jump into video channels for face-to-face meetings.
            </p>
            <Link className="flex items-end gap-[2.5px] text-amber-600 hover:text-amber-500 text-sm">
              <p>Learn More</p>
              <RiArrowRightSLine className="mb-[0.5px]" />
            </Link>
          </div>
          <div className="flex flex-col gap-[7.5px] p-[25px] w-full bg-[#000000]/50 rounded-[12.5px] shrink-0 border border-stone-900 hover:border-stone-700">
            <div className="flex items-center justify-center w-fit p-[6.25px] bg-emerald-950/50 rounded-[7.5px]">
              <TbVideo className="h-[31.25px] w-[31.25px] text-emerald-600/75" />
            </div>
            <h3 className="text-[#eee] text-left text-xl font-bold">
              Integrated Whiteboard
            </h3>
            <p className="text-[#bbb] text-left">
              Collaborate in real-time with our video channels featuring an
              integrated whiteboard for visual brainstorming.
            </p>
            <Link className="flex items-end gap-[2.5px] text-amber-600 hover:text-amber-500 text-sm">
              <p>Learn More</p>
              <RiArrowRightSLine className="mb-[0.5px]" />
            </Link>
          </div>
        </div>
      </div>

      <div
        id="productivity"
        className="w-full flex flex-col lg:flex-row items-center justify-evenly gap-[25px]"
      >
        <div className="flex flex-col gap-[12.5px]">
          <h2 className="text-[#eee] text-3xl md:text-4xl font-bold">
            Personal Productivity Suite
          </h2>
          <p className="text-[#bbb] mb-[7.5px]">
            Boost your productivity with integrated personal tools that help you
            stay organized and focused.
          </p>
          <div className="flex gap-[17.5px]">
            <div className="bg-purple-950/50 rounded-[7.5px] h-fit p-[6.25px]">
              <TbListCheck className="h-[20px] w-[20px] text-purple-600/75" />
            </div>
            <div>
              <h3 className="text-[#eee] text-xl font-bold mt-[1.25px] mb-[2.5px]">
                To-do List
              </h3>
              <p className="text-[#bbb]">
                Keep track of your tasks and never miss a deadline with our
                intuitive to-do list.
              </p>
            </div>
          </div>
          <div className="flex gap-[17.5px]">
            <div className="bg-blue-950/50 rounded-[7.5px] h-fit p-[6.25px]">
              <CgNotes className="h-[20px] w-[20px] text-blue-600/75" />
            </div>
            <div>
              <h3 className="text-[#eee] text-xl font-bold mt-[1.25px] mb-[2.5px]">
                Note-taking
              </h3>
              <p className="text-[#bbb]">
                Capture your ideas and important information with our powerful
                note-taking tool.
              </p>
            </div>
          </div>
          <div className="flex gap-[17.5px]">
            <div className="bg-emerald-950/50 rounded-[7.5px] h-fit p-[6.25px]">
              <LuBell className="h-[20px] w-[20px] text-emerald-600/75" />
            </div>
            <div>
              <h3 className="text-[#eee] text-xl font-bold mt-[1.25px] mb-[2.5px]">
                Reminders
              </h3>
              <p className="text-[#bbb]">
                Set up reminders for important events and tasks to stay on top
                of your schedule.
              </p>
            </div>
          </div>
        </div>
        <div>
          <img
            src="/productivity.png?height=500&width=625"
            alt="Productivity tools interface"
            height={500}
            width={625}
            className="rounded-[7.5px] border border-gray-800 border:blur-10 relative z-10"
          />
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center gap-[12.5px] text-center">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 text-transparent bg-clip-text">
          Ready to Transform How You Connect?
        </h2>
        <p className="text-[#bbb]">
          Join other communities and teams already using our platform to
          communicate, collaborate, and boost productivity.
        </p>
        {/* <Link
          to="/signup"
          className="cursor-pointer flex items-center justify-center h-[50px] w-[175px] mt-[12.5px] text-[#bbb] hover:text-[#ddd] bg-purple-950/75 hover:bg-purple-950 rounded-[7.5px]"
        >
          <div className="text-md font-bold">Get Started</div>
        </Link> */}
      </div>

      <div className="flex flex-col gap-[12.5px] w-full p-[12.5px] bg-[#000000]/67.5 rounded-[12.5px] shrink-0">
        <div className="grid grid-cols-2 md:grid-cols-4 my-[12.5px]">
          <div className="max-[768px]:mb-[20px]">
            <h3 className="text-[#eee] font-bold mb-[10px]">Product</h3>
            <ul className="space-y-[7.5px]">
              <li>
                <Link href="#" className="text-[#bbb] hover:text-[#eee]">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#bbb] hover:text-[#eee]">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#bbb] hover:text-[#eee]">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#bbb] hover:text-[#eee]">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>
          <div className="max-[768px]:mb-[20px]">
            <h3 className="text-[#eee] font-bold mb-[10px]">Resources</h3>
            <ul className="space-y-[7.5px]">
              <li>
                <Link href="#" className="text-[#bbb] hover:text-[#eee]">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#bbb] hover:text-[#eee]">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#bbb] hover:text-[#eee]">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#bbb] hover:text-[#eee]">
                  Community
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#eee] font-bold mb-[10px]">Company</h3>
            <ul className="space-y-[7.5px]">
              <li>
                <Link href="#" className="text-[#bbb] hover:text-[#eee]">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#bbb] hover:text-[#eee]">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#bbb] hover:text-[#eee]">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#bbb] hover:text-[#eee]">
                  Press
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#eee] font-bold mb-[10px]">Legal</h3>
            <ul className="space-y-[7.5px]">
              <li>
                <Link href="#" className="text-[#bbb] hover:text-[#eee]">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#bbb] hover:text-[#eee]">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#bbb] hover:text-[#eee]">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#bbb] hover:text-[#eee]">
                  Licenses
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="h-[1px] w-full bg-stone-900"></div>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center justify-center gap-[5px]">
            <img src="/icon.svg" alt="atom logo" className="w-[17.5px]" />
            <p className="text-[#bbb]">
              {new Date().getFullYear()} Atom Inc. All rights reserved.
            </p>
          </div>
          <div className="flex items-center justify-center gap-[17.5px] text-sm text-[#bbb]">
            <BsGithub className="cursor-pointer" />
            <BsTwitterX className="cursor-pointer" />
            <BsLinkedin className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
