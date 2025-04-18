import { useState } from "react";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [data, setData] = useState([
    { id: 1, name: "testing.txt", type: "Document", modified: "2025-04-18" },
    { id: 2, name: "testing.jpg", type: "Image", modified: "2025-04-18" },
    { id: 3, name: "testing.mp4", type: "Video", modified: "2025-04-18" },
    { id: 4, name: "testing.apk", type: "APK", modified: "2025-04-18" },
    { id: 5, name: "testing.mp3", type: "Audio", modified: "2025-04-18" },
    { id: 6, name: "testing.txt", type: "Document", modified: "2025-04-18" },
    { id: 7, name: "testing.jpg", type: "Image", modified: "2025-04-18" },
    { id: 8, name: "testing.mp4", type: "Video", modified: "2025-04-18" },
    { id: 9, name: "testing.apk", type: "APK", modified: "2025-04-18" },
    { id: 10, name: "testing.mp3", type: "Audio", modified: "2025-04-18" },
    { id: 11, name: "testing.txt", type: "Document", modified: "2025-04-18" },
    { id: 12, name: "testing.jpg", type: "Image", modified: "2025-04-18" },
    { id: 13, name: "testing.mp4", type: "Video", modified: "2025-04-18" },
    { id: 14, name: "testing.apk", type: "APK", modified: "2025-04-18" },
    { id: 15, name: "testing.mp3", type: "Audio", modified: "2025-04-18" },
  ]);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-col items-center gap-[7.5px] w-full overflow-auto [&::-webkit-scrollbar]:hidden">
      <table className="w-full bg-stone-900/50 rounded-[10px]">
        <thead>
          <tr className="h-[43.75px] text-xs font-bold text-[#eee] text-left uppercase">
            <th className="p-[7.5px] pl-[15px]">Name</th>
            <th className="p-[7.5px]">Type</th>
            <th className="p-[7.5px]">Modified</th>
            <th className="p-[7.5px]">Remove</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr
              key={item.id}
              className="text-sm font-semibold text-[#aaa] hover:text-[#eee] text-left hover:bg-stone-900"
            >
              <td className="p-[7.5px] pl-[15px]">{item.name}</td>
              <td className="p-[7.5px]">{item.type}</td>
              <td className="p-[7.5px]">
                {new Date(item.modified).toLocaleDateString()}
              </td>
              <td className="p-[7.5px] pl-[18.75px]">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="cursor-pointer h-[31.25px] w-[31.25px] rounded-full grid place-items-center hover:bg-red-600 text-lg"
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-center gap-[7.5px] font-bold text-[#aaa]">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="cursor-pointer text-lg hover:text-[#eee]"
        >
          <IoIosArrowBack />
        </button>
        <span className="text-xs">
          {currentPage} OF {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="cursor-pointer text-lg hover:text-[#eee]"
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default Table;
