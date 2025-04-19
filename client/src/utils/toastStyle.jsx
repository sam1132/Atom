import { FaExclamationTriangle, FaRegCheckCircle } from "react-icons/fa";

export const toastStyle = {
  position: "top-center",
  reverseOrder: false,
  toastOptions: {
    style: {
    },
    success: {
      style: {
        background: "#10b98126",
        color: "#10b981",
      },
      icon: <FaRegCheckCircle className="h-[18.75px] w-[18.75px]"/>,
    },
    error: {
      style: {
        background: "#ef444426",
        color: "#ef4444",
      },
      icon: <FaExclamationTriangle className="h-[18.75px] w-[18.75px]"/>,
    },
  },
};
