"use client";

import { _registrationSubmit } from "@/clientServices/auth";
import FormAlert from "@/components/material/FormAlert";
import TextField from "@/components/material/TextField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import queryString from "querystring";

const Credentials = ({ initData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    step: "credentials",
    password: "",
    confirm_password: "",
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
    setErrors({});
    setError("");

    const res = await _registrationSubmit({ ...initData, ...data });

    if (res.success) {
      router.push(
        "/register/complete?" +
          queryString.stringify({
            ...initData,
            ...data,
          })
      );
    } else {
      setErrors(res.errors || {});
      setLoading(false);
      setError(res.message);
    }
  }

  return (
    <form
      onSubmit={_onSubmit}
      className="relative w-full  max-w-2xl p-[5px] sm:p-[50px]  ">
      <div className="">
        <h1 className="">
          Welcome to <span className="text-secondary">StartUp</span>
        </h1>
        <p className="text-left leading-tight">
          We need you to create a password for your account{" "}
          <strong> {initData.email}</strong>
        </p>
      </div>

      <div className="my-7 max-w-lg mx-auto">
        {error && <FormAlert error={true} message={error} />}
      </div>

      <p className="label">Password</p>
      <TextField
        label="Password"
        name="password"
        placeholder="*********"
        required={true}
        onChange={_onChange}
        type="password"
      />

      <p className="label">Confirm Password</p>
      <TextField
        label="Password"
        name="confirm_password"
        placeholder="*********"
        required={true}
        onChange={_onChange}
        type="password"
      />

      <div className="grid grid-cols-2 gap-7 mt-7">
        <div className="col-span-1">
          <Link
            href="/"
            className="block w-full py-4 border-2 border-primary text-center  font-[600]  text-[16px] text-primary rounded-lg ring-primary hover:ring-1 hover:opacity-80">
            Cancel
          </Link>
        </div>
        <div className="col-span-1">
          <button
            type="submit"
            disabled={loading}
            className=" w-full py-4 bg-primary font-[600] text-[16px] text-white rounded-lg hover:opacity-80 disabled:opacity-70">
            {loading ? "loading..." : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Credentials;
