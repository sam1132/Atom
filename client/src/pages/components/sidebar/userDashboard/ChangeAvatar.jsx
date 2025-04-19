import toast from "react-hot-toast";
import { useState, useRef } from "react";

import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

import { useAuth } from "../../../auth/Context";

const ChangeAvatar = ({ currentUser, setBackendUser, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const { backendUser } = useAuth();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleSubmit = async () => {
    if (!fileInputRef.current?.files?.[0]) {
      toast.error("Please select an image first");
      return;
    }
    try {
      setLoading(true);
      const token = await currentUser.getIdToken();
      const formData = new FormData();
      formData.append("image", fileInputRef.current.files[0]);
      const uploadRes = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!uploadRes.ok) throw new Error("Image upload failed");
      const { url } = await uploadRes.json();
      const updateRes = await fetch(
        `http://localhost:3000/api/users/${currentUser.uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ avatar: url }),
        }
      );
      if (!updateRes.ok) throw new Error("Profile update failed");
      const updatedUser = await updateRes.json();
      setBackendUser(updatedUser);
      toast.success("You're all set with your new look!");
      onClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50">
      <div className="relative flex flex-col items-center gap-[37.5px] w-[325px] bg-neutral-950 border-[1px] border-[#2f184b]/75 rounded-[10px] p-[18.75px]">
        <RxCross2
          onClick={onClose}
          className="absolute top-[12.5px] right-[12.5px] cursor-pointer text-[#bbb] hover:text-[#ddd] text-md max-[500px]:text-sm"
        />
        <p className="text-[#bbb] text-xs font-bold uppercase">Update Profile Picture</p>
        <div className="relative w-[125px] h-[125px] rounded-full bg-[#2f184b]/25 border-2 border-dashed border-[#2f184b]">
          <img
            src={imagePreview || backendUser?.avatar}
            alt="Preview"
            className="w-full h-full rounded-full object-cover"
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="translate-x-[225%] translate-y-[-90%] w-[37.5px] h-[37.5px] rounded-full cursor-pointer flex items-center justify-center text-lg bg-purple-950/75 hover:bg-purple-950 text-[#bbb] hover:text-[#eee]"
          >
            <FaPlus />
          </div>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="cursor-pointer flex items-center justify-center h-[37.5px] w-full text-[#bbb] hover:text-[#ddd] bg-purple-950/75 hover:bg-purple-950 rounded-[7.5px]"
        >
          {loading ? (
            <div className="h-[20px] w-[20px] border-3 border-t-white/75 border-black/25 rounded-full animate-spin"></div>
          ) : (
            <p className="text-xs font-bold">Apply Changes</p>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChangeAvatar;
