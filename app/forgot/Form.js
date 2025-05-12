"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next-nprogress-bar";
import axios from "axios";
import FormAlert from "@/components/material/FormAlert";
import TextField from "@/components/material/TextField";

const Form = ({ step, email, token }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [btnTitle, setBtnTitle] = useState("Continue");
  const [data, setData] = useState({
    email: "",
    token: "",
    password: "",
    password_confirmation: "",
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

    try {
      if (step === "initiate") {
        const { data: resData } = await axios.post(
          "/api/auth/send-reset-token",

          data
        );

        if (resData && resData.success) {
          router.push("/forgot?step=send_email&email=" + data.email);
        } else {
          setError(resData.message);
        }
      } else if (step === "send_email") {
        const { data: resData } = await axios.post(
          "/api/auth/verify-reset-token",

          data
        );

        if (resData && resData.success) {
          router.push(
            "/forgot?step=reset&email=" +
              email +
              "&token=" +
              resData.encryptedToken
          );
        } else {
          setError(resData.message);
        }
      } else if (step === "reset") {
        if (data.password !== data.password_confirmation) {
          setError("Passwords did not match.");
          setLoading(false);
          return;
        }
        const { data: resData } = await axios.post("/api/auth/reset_password", {
          encryptedToken: token,
          password: data.password,
          password_confirmation: data.password_confirmation,
        });

        if (resData && resData.success) {
          setData({
            email: "",
            token: "",
            password: "",
            password_confirmation: "",
          });

          setSuccess(
            "Password reset successfully. You will be redirected to login page in 5 seconds."
          );

          setTimeout(() => {
            router.push("/login");
          }, 5000);
        } else {
          setError(resData.message);
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }

    setLoading(false);
  }

  async function _onResend() {
    setResendLoading(true);
    setError("");
    setSuccess("");
    try {
      const { data } = await axios.post("/api/auth/send-reset-token", {
        email,
      });

      if (data.success) {
        setSuccess(data.message);
        setError("");
      } else {
        setError(data.message);
        setSuccess("");
      }
    } catch (error) {
      setResendLoading(false);
    }
    setResendLoading(false);
  }

  const messages = [
    " Enter your account email address and we will send a reset token to reset your email.",
    "Enter the token sent to your email address, " + email + ".",
    "Enter your new password.",
  ];
  return (
    <form
      onSubmit={_onSubmit}
      className="relative w-full  max-w-2xl mx-auto p-[20px] sm:p-[50px] ">
      <h1 className="text-[30px] sm:text-[40px]">Forgot Password</h1>

      <div className="w-full ">
        <p className="leading-tight text-[15px] mb-4">
          {step === "initiate" && messages[0]}
          {step === "send_email" && messages[1]}
          {step === "reset" && messages[2]}
        </p>

        {error && <FormAlert error={true} message={error} />}
        {success && <FormAlert success={true} message={success} />}

        {step === "initiate" && (
          <TextField
            label="EMAIL"
            name="email"
            placeholder="Email Address"
            className="bg-[#f7f7f7]"
            required={true}
            onChange={_onChange}
            type="email"
          />
        )}

        {step === "send_email" && email && (
          <div className="w-full">
            <TextField
              label="RESET TOKEN"
              name="token"
              placeholder="Reset Token"
              className="bg-[#f7f7f7]"
              required={true}
              onChange={_onChange}
              keyboardType="number-pad"
              type="password"
            />

            <div className="flex justify-end">
              <button
                type="button"
                disabled={resendLoading}
                onClick={_onResend}
                className=" font-[600] text-[15px] mt-2 border-primary-light hover:border-b">
                {resendLoading ? "Loading..." : "Resend Token"}
              </button>
            </div>
          </div>
        )}

        {step === "reset" && email && (
          <div>
            <TextField
              label="PASSWORD"
              name="password"
              placeholder="Password"
              className="bg-[#f7f7f7]"
              required={true}
              onChange={_onChange}
              type="password"
              disabled={success}
            />

            <TextField
              label="CONFIRM PASSWORD"
              name="password_confirmation"
              placeholder="Confirm Password"
              className="bg-[#f7f7f7]"
              required={true}
              onChange={_onChange}
              type="password"
              disabled={success}
            />
          </div>
        )}
      </div>
      <div className="grid grid-cols-2  gap-5 md:gap-7 mt-7">
        <div className="col-span-1">
          <Link
            href="/dashboard"
            className="block w-full py-4 border-2 border-primary text-center  font-[600]  text-[16px] text-primary rounded-lg ring-primary hover:ring-1 hover:opacity-80">
            Cancel
          </Link>
        </div>
        <div className="col-span-1">
          <button
            type="submit"
            disabled={loading}
            className=" w-full py-4 bg-primary font-[600] text-[16px] text-white rounded-lg hover:opacity-80">
            {loading ? "loading..." : btnTitle}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
