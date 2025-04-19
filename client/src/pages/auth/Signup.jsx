import { useState } from "react";
import { useAuth } from "./Context";
import { SignupSchema } from "./schema";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { SiAuthelia } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const { signup, googleSignIn, githubSignIn } = useAuth() || {};
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    toast.dismiss();
    try {
      setLoading(true);
      await signup?.(data.email, data.password);
      toast.success("Signed up with Email!");
      navigate("/setup-profile");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await googleSignIn?.();
      toast.success("Signed up with Google!");
      navigate("/setup-profile");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await githubSignIn?.();
      toast.success("Signed up with Github!");
      navigate("/setup-profile");
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
        className="flex flex-col items-center gap-[25px] w-[325px] bg-[#000000]/67.5 rounded-[10px] pt-[67.5px] pb-[18.75px]"
      >
        <p className="text-[#bbb] text-xs font-bold ">
          Design your path. Begin with Atom.
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
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="h-[37.5px] w-full px-3 py-3 rounded-[7.5px] bg-[#2f184b]/37.5 border-[1px] border-[#2f184b]/75 focus:outline-none text-sm font-normal text-[#eee]"
          />
          {errors.password && (
            <p className="text-red-600 text-[12.5px] font-semibold w-full px-1 mt-[-18.75px]">
              {errors.password.message}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer flex items-center justify-center h-[37.5px] w-full text-[#bbb] hover:text-[#ddd] bg-purple-950/75 hover:bg-purple-950 rounded-[7.5px]"
          >
            <div className="text-xs font-bold">
              {loading ? (
                <div className="h-[20px] w-[20px] border-3 border-t-white/75 border-black/25 rounded-full animate-spin"></div>
              ) : (
                "Create an account"
              )}
            </div>
          </button>
        </form>
        <p className="text-[#aaa] text-[8.75px] font-bold m-[-12.5px]">OR</p>
        <div className="flex w-full gap-[10px] px-[18.75px]">
          <button
            disabled={loading}
            onClick={handleGoogleSignIn}
            className="cursor-pointer flex items-center justify-center h-[37.5px] w-full bg-[#ddd]/87.5 hover:bg-[#eee] rounded-[7.5px]"
          >
            <FcGoogle className="!h-[20px] !w-[20px]" />
          </button>
          <button
            disabled={loading}
            onClick={handleGithubSignIn}
            className="cursor-pointer flex items-center justify-center h-[37.5px] w-full bg-[#ddd]/87.5 hover:bg-[#ddd] rounded-[7.5px]"
          >
            <FaGithub className="!h-[20px] !w-[20px]" />
          </button>
        </div>
        <Link
          to="/login"
          className="text-[#aaa] hover:text-[#ccc] hover:underline text-xs font-semibold mt-[-7.5px]"
        >
          Already have an account?
        </Link>
      </div>
    </div>
  );
};

export default Signup;
