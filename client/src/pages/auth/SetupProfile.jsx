import { SetupSchema } from "./schema";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaPlus } from "react-icons/fa6";
import { useAuth } from "./Context";

const SetupProfile = () => {
  const { currentUser, setBackendUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    "https://i.pinimg.com/236x/08/f6/4a/08f64a7cb64b67167d6b5e75429b26bb.jpg"
  );
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SetupSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const onSubmit = async (data) => {
    toast.dismiss();
    try {
      setLoading(true);
      let avatarUrl = imagePreview;
      if (fileInputRef.current?.files?.[0]) {
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
        avatarUrl = url;
      }
      const updateRes = await fetch(
        `http://localhost:3000/api/users/${currentUser.uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await currentUser.getIdToken()}`,
          },
          body: JSON.stringify({
            displayName: data.name,
            avatar: avatarUrl,
          }),
        }
      );
      if (!updateRes.ok) {
        const errorData = await updateRes.json();
        throw new Error(errorData.error || "Profile update failed");
      }
      const updatedUser = await updateRes.json();
      setBackendUser(updatedUser);
      toast.success("Explore What's Waiting for You!");
      navigate("/user");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full">
      <div className="flex flex-col items-center gap-[37.5px] w-[325px] bg-[#000000]/67.5 rounded-[10px] p-[18.75px]">
        <p className="text-[#bbb] text-xs font-bold uppercase">
          Let's Get You Set Up
        </p>

        <div className="relative w-[125px] h-[125px] rounded-full bg-[#2f184b]/25 border-2 border-dashed border-[#2f184b]">
          <img
            src={imagePreview}
            alt="avatar preview"
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center gap-[18.75px]"
        >
          <input
            type="text"
            placeholder="What should we call you?"
            {...register("name")}
            className="h-[37.5px] w-full px-3 py-3 rounded-[7.5px] bg-[#2f184b]/37.5 border-[1px] border-[#2f184b]/75 focus:outline-none text-sm font-normal text-[#eee]"
          />
          {errors.name && (
            <p className="text-red-600 text-[12.5px] font-semibold w-full px-1 mt-[-18.75px]">
              {errors.name.message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer flex items-center justify-center h-[37.5px] w-full text-[#bbb] hover:text-[#ddd] bg-purple-950/75 hover:bg-purple-950 rounded-[7.5px]"
          >
            {loading ? (
              <div className="h-[20px] w-[20px] border-3 border-t-white/75 border-black/25 rounded-full animate-spin"></div>
            ) : (
              <p className="text-xs font-bold">Save & Continue</p>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetupProfile;
