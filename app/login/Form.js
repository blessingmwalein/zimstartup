"use client";

import { signIn } from "next-auth/react";
import FormAlert from "@/components/material/FormAlert";
import TextField from "@/components/material/TextField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  function _onChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setData((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  async function _onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const { ok, error } = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    console.log(ok, error);
    if (!ok && error) {
      setError(error);
    } else {
      location.reload();
    }
    setLoading(false);
  }

  return (
    <form
      onSubmit={_onSubmit}
      className="relative w-full  max-w-2xl mx-auto p-[20px] sm:p-[50px] ">
      <div className="w-[fit-content] mx-auto">
        <h1 className="text-center">
          Welcome to <span className="text-secondary">StartUp</span>
        </h1>
        <p className="text-left">To get started Login</p>
      </div>

      <div className="w-full mt-5">
        {error && <FormAlert error={true} message={error} />}
        <TextField
          label="Email/Phone Number"
          name="email"
          placeholder="Email Address or Phone Number"
          required={true}
          onChange={_onChange}
          type="text"
          className="mt-3"
        />

        <TextField
          label="Password"
          name="password"
          placeholder="Password"
          required={true}
          onChange={_onChange}
          type="password"
        />

        <Link
          href="/forgot?step=initiate"
          className=" mt-2  text-[16px] text-primary   underline font-semibold hover:no-underline ">
          Forgot Password?
        </Link>
      </div>

      <div className="grid grid-cols-2  gap-5 md:gap-7 mt-7">
        <div className="col-span-1">
          <button
            type="submit"
            disabled={loading}
            className=" w-full py-4 bg-primary font-[600] text-[16px] text-white rounded-lg hover:opacity-80">
            {loading ? "loading..." : "Login"}
          </button>
        </div>

        <div className="col-span-1">
          <Link
            href="/register"
            className="block w-full py-4 border-2 border-primary text-center  font-[600]  text-[16px] text-primary rounded-lg ring-primary hover:ring-1 hover:opacity-80">
            Register
          </Link>
        </div>
      </div>

      <div className="flex items-center  my-9">
        <div className="flex-1 h-[2px] bg-gray" />
        <div className="py-1 px-2 border-2 border-gray rounded-md">
          <p className="text-gray text-[19px]">OR</p>
        </div>

        <div className="flex-1 h-[2px] bg-gray" />
      </div>

      <div className="flex justify-center items-center gap-5">
        <button
          type="button"
          onClick={() => signIn("google", { redirect: false })}
          className="social-login-btn hover:border-primary">
          <FcGoogle className="text-[30px]" />
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
