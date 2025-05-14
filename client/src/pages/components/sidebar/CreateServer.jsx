import { useForm } from "react-hook-form";
import { useRef, useState,useEffect} from "react";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

import { ServerSchema } from "../../auth/schema";
import { useAuth } from "../../auth/Context";

const CreateServer = ({ onClose,onServerCreated }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [iconPreview, setIconPreview] = useState(
    "https://pm1.aminoapps.com/8181/665e7c6631522e9946805aa7866e4675d74211f0r1-2000-2000v2_uhq.jpg"
  );
  const [bannerPreview, setBannerPreview] = useState(
    "https://t4.ftcdn.net/jpg/03/86/82/73/360_F_386827376_uWOOhKGk6A4UVL5imUBt20Bh8cmODqzx.jpg"
  );
  const iconFileRef = useRef(null);
  const bannerFileRef = useRef(null);
  const [iconFile, setIconFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ServerSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleIconChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconPreview(URL.createObjectURL(file));
      setIconFile(file);
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerPreview(URL.createObjectURL(file));
      setBannerFile(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const token = await currentUser.getIdToken();
      const uploadImage = async (file, folder) => {
        if (!file) return null;
        const formData = new FormData();
        formData.append("image", file);
        const uploadRes = await fetch(
          `http://localhost:3000/api/upload?folder=${folder}`,
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          }
        );
        if (!uploadRes.ok) throw new Error("Image upload failed");
        return (await uploadRes.json()).url;
      };
      const [iconUrl, bannerUrl] = await Promise.all([
        uploadImage(iconFile, "atom-server"),
        uploadImage(bannerFile, "atom-server"),
      ]);
      const serverRes = await fetch("http://localhost:3000/api/servers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: data.name,
          icon: iconUrl || iconPreview,
          banner: bannerUrl || bannerPreview,
        }),
      });
      if (!serverRes.ok) {
        const errorData = await serverRes.json();
        throw new Error(errorData.error || "Server creation failed");
      }

      const newServer = await serverRes.json();
      if(onServerCreated){
        onServerCreated(newServer);
      }
      onClose();
      toast.success("Server created successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
    return (
    <div className="fixed inset-0 bg-black/25 backdrop-blur-[2.5px] flex items-center justify-center z-50">
      <div className="relative flex flex-col items-center gap-[37.5px] w-[325px] bg-neutral-950 border-[1px] border-[#2f184b]/50 rounded-[10px] p-[18.75px]">
        <RxCross2
          onClick={onClose}
          className="absolute top-[12.5px] right-[12.5px] cursor-pointer text-[#bbb] hover:text-[#ddd] text-md max-[500px]:text-sm"
        />
        <p className="text-[#bbb] text-xs font-bold uppercase">
          Customise Your Server
        </p>
        <p className="mt-[-25px] text-[#aaa] text-xs text-center font-semibold">
          Personalize your server’s profile with a name, icon, and banner.
        </p>
        <div className="relative mt-[-18.75px] w-full h-[125px] rounded-[7.5px] bg-[#2f184b]/25 border-2 border-dashed border-[#2f184b]">
          <img
            src={bannerPreview}
            alt="Banner Preview"
            className="w-full h-full rounded-[7.5px] object-cover"
          />
          <div
            onClick={() => bannerFileRef.current?.click()}
            className="translate-x-[625%] translate-y-[-300%] w-[37.5px] h-[37.5px] rounded-[5px] cursor-pointer flex items-center justify-center text-lg bg-purple-950/50 hover:bg-purple-950/75 text-[#bbb] hover:text-[#eee]"
          >
            <FaPlus />
          </div>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            ref={bannerFileRef}
            onChange={handleBannerChange}
            className="hidden"
          />
          <img
            src={iconPreview}
            alt="Preview"
            className="translate-x-[87.5%] translate-y-[-87.5%] w-[100px] h-[100px] rounded-full object-cover bg-[#2f184b]/25 border-2 border-dashed border-[#2f184b]"
          />
          <div
            onClick={() => iconFileRef.current?.click()}
            className="translate-x-[412.5%] translate-y-[-325%] w-[37.5px] h-[37.5px] rounded-full cursor-pointer flex items-center justify-center text-lg bg-purple-950/50 hover:bg-purple-950/75 text-[#bbb] hover:text-[#eee]"
          >
            <FaPlus />
          </div>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            ref={iconFileRef}
            onChange={handleIconChange}
            className="hidden"
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center gap-[18.75px] mt-[37.5px]"
        >
          <input
            type="text"
            placeholder="Got a name for your server?"
            {...register("name")}
            className="h-[37.5px] w-full px-3 py-3 rounded-[7.5px] bg-[#2f184b]/37.5 border-[1px] border-[#2f184b]/75 focus:outline-none text-sm font-normal text-[#eee]"
          />
          {errors.name && (
            <p className="text-red-600 text-[12.5px] font-semibold w-full px-1 mt-[-18.75px]">
              {errors.name.message}
            </p>
          )}

          <button className="cursor-pointer flex items-center justify-center h-[37.5px] w-full text-[#bbb] hover:text-[#ddd] bg-purple-950/75 hover:bg-purple-950 rounded-[7.5px]">
            {loading ? (
              <div className="h-[20px] w-[20px] border-3 border-t-white/75 border-black/25 rounded-full animate-spin"></div>
            ) : (
              <p className="text-xs font-bold">Create Server</p>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateServer;
