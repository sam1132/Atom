import React, { useState } from "react";
import { IoMdSearch, IoMdDocument } from "react-icons/io";
import bannerImg from "../assets/banner.png";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { FaRegImages } from "react-icons/fa";
import {
  MdOutlineVideoLibrary,
  MdOutlineAudiotrack,
  MdDelete,
} from "react-icons/md";
import { RiAppsFill } from "react-icons/ri";
import { Box, Chip, IconButton } from "@mui/material";

const Resources = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      fileName: "report.pdf",
      category: "Document",
      fileSize: "1.2MB",
      uploadDate: "2024-03-01",
    },
    {
      id: 2,
      fileName: "invoice.xlsx",
      category: "Document",
      fileSize: "800KB",
      uploadDate: "2024-03-05",
    },
    {
      id: 3,
      fileName: "presentation.pptx",
      category: "Document",
      fileSize: "2.5MB",
      uploadDate: "2024-03-10",
    },
    {
      id: 4,
      fileName: "logo.png",
      category: "Image",
      fileSize: "500KB",
      uploadDate: "2024-03-12",
    },
    {
      id: 5,
      fileName: "contract.docx",
      category: "Document",
      fileSize: "300KB",
      uploadDate: "2024-03-15",
    },
    {
      id: 6,
      fileName: "summary.txt",
      category: "Document",
      fileSize: "45KB",
      uploadDate: "2024-03-18",
    },
    {
      id: 7,
      fileName: "budget.csv",
      category: "Document",
      fileSize: "220KB",
      uploadDate: "2024-03-22",
    },
    {
      id: 8,
      fileName: "design_sketch.ai",
      category: "Image",
      fileSize: "3.1MB",
      uploadDate: "2024-03-25",
    },
    {
      id: 9,
      fileName: "survey_results.pdf",
      category: "Document",
      fileSize: "1.7MB",
      uploadDate: "2024-03-28",
    },
  ]);
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/documents/${id}`, {
        method: "DELETE",
      });
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const columns = [
    {
      field: "fileName",
      headerName: "File Name",
      width: 120,
      flex: 0.5,
      headerClassName: "file-name-header",
      renderCell: (params) => (
        <div style={{ paddingLeft: "40px" }}>{params.value}</div>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      width: 110,
      flex: 0.5,
      renderCell: (params) => {
        const colorMap = {
          Document: "info",
          Image: "success",
          Video: "warning",
          Audio: "secondary",
          Other: "default",
        };

        return (
          <Chip
            label={params.value}
            color={colorMap[params.value] || "default"}
            size="small"
            variant="outlined"
          />
        );
      },
    },
    { field: "fileSize", headerName: "File Size", width: 100, flex: 0.5 },
    {
      field: "uploadDate",
      headerName: "Upload Date",
      width: 120,
      flex: 1,
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={() => handleDelete(params.row.id)}>
          <MdDelete  className="text-red-500"/>
        </IconButton>
      ),
    },
  ];
  const paginationModel = { page: 0, pageSize: 5 };
  return (
    <>
      <main className="pl-18 bg-slate-900 ">
        <div className="relative ml-2">
          <IoMdSearch className="text-2xl text-black md:text-[1.7rem] absolute  top-5 left-5 md:top-6" />
          <input
            type="search"
            className="m-4 w-56 h-8 md:w-70 md:h-8 rounded-md bg-gray-100 md:bg-gray-300 md:py-5 md:pl-10 py-2 pl-8"
            placeholder="Search for the files"
          />
        </div>
        {/* banner */}
        <div
          className="md:w-[97%]  md:block h-36 bg-cover bg-center rounded-md mt-5 mx-5 "
          style={{ backgroundImage: `url(${bannerImg})` }}
        >
          <h1 className="md:text-3xl text-[0.9rem] font-bold px-6 pt-6 mb-2 text-white">
            Atom where Collboration sparks Innovation
          </h1>
          <p className="px-6 text-[0.79rem] md:text-xl text-gray-300 font-bold">
            Empowering developers to learn, build, and grow together in one
            unified platform.
          </p>
        </div>
        <h1 className="mx-5 my-7 text-2xl md:text-3xl text-white font-semibold">
          My Storage
        </h1>
        <div className="flex md:flex-row flex-col justify-between gap-x-4 gap-y-4 mx-5 ">
          <div className="p-4 bg-white md:h-32 md:w-72 rounded-md">
            <div className="bg-violet-200 h-10 w-10 flex items-center justify-center text-[1.3rem] text-violet-900 mb-2 rounded-full">
              {<IoMdDocument />}
            </div>
            <p className="text-xl text-gray-600 font-semibold">Documents</p>
            <p className="text-xl font-bold">67 Files</p>
          </div>
          <div className="p-4 bg-white md:h-32 md:w-72 rounded-md">
            <div className="bg-blue-200 h-10 w-10 flex items-center justify-center text-[1.3rem] text-blue-900 mb-2 rounded-full">
              {<MdOutlineVideoLibrary />}
            </div>
            <p className="text-xl text-gray-600 font-semibold">Videos</p>
            <p className="text-xl font-bold">10 Files</p>
          </div>
          <div className="p-4 bg-white md:h-32 md:w-72 rounded-md">
            <div className="bg-gray-200 h-10 w-10 flex items-center justify-center text-[1.3rem] text-gray-900 mb-2 rounded-full">
              {<FaRegImages />}
            </div>
            <p className="text-xl text-gray-600 font-semibold">Images</p>
            <p className="text-xl font-bold">30 Files</p>
          </div>
          <div className="p-4 bg-white md:h-32 md:w-72 rounded-md">
            <div className="bg-blue-200 h-10 w-10 flex items-center justify-center text-[1.3rem] text-blue-950 mb-2 rounded-full">
              {<MdOutlineAudiotrack />}
            </div>
            <p className="text-xl text-gray-600 font-semibold">Audios</p>
            <p className="text-xl font-bold">5 Files</p>
          </div>
          <div className="p-4 bg-white mb-5 md:h-32 md:w-72 rounded-md">
            <div className="bg-green-200 h-10 w-10 flex items-center justify-center text-[1.3rem] text-green-900 mb-2 rounded-full">
              {<RiAppsFill />}
            </div>
            <p className="text-xl text-gray-600 font-semibold">others</p>
            <p className="text-xl font-bold">6 Files</p>
          </div>
        </div>
        {/* Table */}
        <Box sx={{ paddingBottom: "40px" }}>
          <Paper
            sx={{
              height: 400,
              width: {
                xs: "86%",
                sm: "93%",
                lg: "97.2%",
              },
              marginX: "20px",
            }}
          >
            <DataGrid
              sx={{
                "& .file-name-header": {
                  paddingLeft: "40px",
                },
                border: 0,
              }}
              rows={rows}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
            />
          </Paper>
        </Box>
      </main>
    </>
  );
};

export default Resources;
