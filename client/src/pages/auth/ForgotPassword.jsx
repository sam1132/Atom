import { useState } from "react";
import { useAuth } from "./Context";
import { ResetSchema } from "./schema";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { SiAuthelia } from "react-icons/si";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth() || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    toast.dismiss();
    try {
      setLoading(true);
      await resetPassword?.(data.email);
      toast.success("Kindly review your email inbox.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full">
      <div className="flex items-center justify-center gap-[10px] h-[82.5px] w-[82.5px] bg-[#000000]/67.5 rounded-full translate-y-[50%]">
        <SiAuthelia className="!h-[62.5px] !w-[62.5px] text-purple-900" />
      </div>
      <div
        // bg-white/5
        className="flex flex-col items-center gap-[25px] w-[325px] bg-[#000000]/67.5 rounded-[10px] pt-[67.5px] pb-[18.75px]"
      >
        <p className="text-[#bbb] text-xs font-bold ">
          Lost your way? Let's reset it together.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center gap-[18.75px] px-[18.75px]"
        >
          <input
            type="email"
            placeholder="Email Address"
            {...register("email")}
            className="h-[37.5px] w-full px-3 py-3 rounded-[7.5px] bg-[#2f184b]/37.5 border-[1px] border-[#2f184b]/75 focus:outline-none text-sm font-normal text-[#eee]"
          />
          {errors.email && (
            <p className="text-red-600 text-[12.5px] font-semibold w-full px-1 mt-[-18.75px]">
              {errors.email.message}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center h-[37.5px] w-full text-[#bbb] hover:text-[#ddd] bg-purple-950/75 hover:bg-purple-950 rounded-[7.5px]"
          >
            <div className="text-xs font-bold">
              {loading ? (
                <div className="h-[20px] w-[20px] border-3 border-t-white/75 border-black/25 rounded-full animate-spin"></div>
              ) : (
                "Reset Password"
              )}
            </div>
          </button>
        </form>
        <Link
          to="/login"
          className="text-[#aaa] hover:text-[#ccc] hover:underline text-xs font-semibold mt-[-7.5px]"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
