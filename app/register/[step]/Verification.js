"use client";

import { _registrationSubmit } from "@/clientServices/auth";
import FormAlert from "@/components/material/FormAlert";
import Select from "@/components/material/Select";
import TextField from "@/components/material/TextField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import queryString from "querystring";

const Verification = ({ initData }) => {
  const [loading, setLoading] = useState(false);
  const [error_message, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [source, setSource] = useState("");
  const [data, setData] = useState({
    step: "account-verification",
    verification_code: "",
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
    setErrorMessage("");

    if (!source) {
      setErrors((prevState) => {
        return { ...prevState, source: "Source is required" };
      });
      setLoading(false);
      return;
    }

    if (sent) {
      const res = await _registrationSubmit(data);

      if (res.success) {
        router.push(
          "/register/complete?" +
            queryString.stringify({
              ...initData,
              ...res.data,
            })
        );
      } else {
        setErrors(res.errors || {});
        setLoading(false);
        setErrorMessage(res.message);
      }
    } else {
      setSent(true);
      setLoading(false);
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
          We need you to verify your phone {initData.phone1} <br /> or email{" "}
          {initData.email}
        </p>
      </div>

      <div className="my-7 max-w-lg mx-auto">
        <FormAlert error={Boolean(error_message)} message={error_message} />
      </div>

      <div className="grid md:grid-cols-5 gap-5">
        <div className="col-span-3">
          <label className="label">Source:</label>
          <Select
            placeholder="Select verification source *"
            options={[
              { label: "Phone", value: "Phone" },
              { label: "Email", value: "Email" },
            ]}
            value={source}
            onChange={(value) => {
              setSource(value);
            }}
            error={errors.source}
          />
        </div>
      </div>

      {sent && (
        <div className="mt-5">
          <label className="label">Verification code:</label>
          <TextField
            name="verification_code"
            type="number"
            value={data.verification_code}
            onChange={_onChange}
          />
        </div>
      )}

      {sent && (
        <div className="flex justify-end items-center gap-2">
          <p>Did not get the code?</p>{" "}
          <button
            type="button"
            className="py-1 px-2  text-[16px] underline rounded-full hover:bg-[#e9eff7]">
            Resend
          </button>
        </div>
      )}

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
            {loading ? "loading..." : sent ? "Continue" : "Send code"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Verification;
