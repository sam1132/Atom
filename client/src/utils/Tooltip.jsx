import { useState } from "react";

const Tooltip = ({ position = "top", text, children }) => {
  const [visible, setVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {visible && (
        <div
          className={`absolute bg-gray-900 text-white text-sm py-1 px-2 rounded w-max shadow-md ${positionClasses[position]}`}
        >
          {text}
        </div>
      )}
      {children}
    </div>
  );
};

export default Tooltip;
