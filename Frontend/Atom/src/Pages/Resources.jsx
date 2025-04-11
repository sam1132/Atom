import React from 'react'
import { IoMdSearch,IoMdDocument } from "react-icons/io";
import bannerImg from '../assets/banner.png'
import { FaRegImages } from "react-icons/fa";
import { MdOutlineVideoLibrary,MdOutlineAudiotrack } from "react-icons/md";
import { RiAppsFill } from "react-icons/ri";
import Table from '../Components/Table';
const Resources = () => {
  return (
    <>
    <main className='pl-18 bg-slate-900 '>
      <div className='relative ml-2'>
        <IoMdSearch className='text-2xl text-black md:text-[1.7rem] absolute  top-5 left-5 md:top-6' />
        <input type="search" className='m-4 w-56 h-8 md:w-70 md:h-8 rounded-md bg-gray-100 md:bg-gray-300 md:py-5 md:pl-10 py-2 pl-8' placeholder='Search for the files'/>
      </div>
      {/* banner */}
      <div className='md:w-[97%]  md:block h-36 bg-cover bg-center rounded-md mt-5 mx-5 ' style={{ backgroundImage: `url(${bannerImg})` }}> 
         <h1 className='md:text-3xl text-[0.9rem] font-bold px-6 pt-6 mb-2 text-white'>Atom where Collboration sparks Innovation</h1>
         <p className='px-6 text-[0.79rem] md:text-xl text-gray-300 font-bold'>Empowering developers to learn, build, and grow together in one unified platform.</p>
      </div>
      <h1 className='mx-5 my-7 text-2xl md:text-3xl text-white font-semibold'>My Storage</h1>
      <div className='flex md:flex-row flex-col justify-between gap-x-4 gap-y-4 mx-5 '>
        <div className='p-4 bg-white md:h-32 md:w-72 rounded-md'>
          <div className='bg-violet-200 h-10 w-10 flex items-center justify-center text-[1.3rem] text-violet-900 mb-2 rounded-full'>{< IoMdDocument/>}</div>
          <p className='text-xl text-gray-600 font-semibold'>Documents</p>
          <p className='text-xl font-bold'>67 Files</p>
        </div>
        <div className='p-4 bg-white md:h-32 md:w-72 rounded-md'>
          <div className='bg-blue-200 h-10 w-10 flex items-center justify-center text-[1.3rem] text-blue-900 mb-2 rounded-full'>{< MdOutlineVideoLibrary/>}</div>
          <p className='text-xl text-gray-600 font-semibold'>Videos</p>
          <p className='text-xl font-bold'>10 Files</p>
        </div>
        <div className='p-4 bg-white md:h-32 md:w-72 rounded-md'>
          <div className='bg-gray-200 h-10 w-10 flex items-center justify-center text-[1.3rem] text-gray-900 mb-2 rounded-full'>{< FaRegImages/>}</div>
          <p className='text-xl text-gray-600 font-semibold'>Images</p>
          <p className='text-xl font-bold'>30 Files</p>
        </div>
        <div className='p-4 bg-white md:h-32 md:w-72 rounded-md'>
          <div className='bg-blue-200 h-10 w-10 flex items-center justify-center text-[1.3rem] text-blue-950 mb-2 rounded-full'>{< MdOutlineAudiotrack/>}</div>
          <p className='text-xl text-gray-600 font-semibold'>Audios</p>
          <p className='text-xl font-bold'>5 Files</p>
        </div>
        <div className='p-4 bg-white mb-5 md:h-32 md:w-72 rounded-md'>
          <div className='bg-green-200 h-10 w-10 flex items-center justify-center text-[1.3rem] text-green-900 mb-2 rounded-full'>{< RiAppsFill/>}</div>
          <p className='text-xl text-gray-600 font-semibold'>others</p>
          <p className='text-xl font-bold'>6 Files</p>
        </div>
      </div>
      {/* Table */}
     <Table/>
    </main>
    </>
  )
}

export default Resources