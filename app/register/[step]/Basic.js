"use client";

import Select from "@/components/material/Select";
import TextField from "@/components/material/TextField";
import Link from "next/link";
import Datepicker from "react-tailwindcss-datepicker";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { _registrationSubmit } from "@/clientServices/auth";
import FormAlert from "@/components/material/FormAlert";
import nationalities from "@/utils/nationalities";
import queryString from "querystring";

import moment from "moment";

const titles = ["Mr", "Ms", "Mrs", "Miss", "Dr", "Prof", "Ps"];

const Basic = ({ initData }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    step: "basic",
    title: "",
    first_name: "",
    middle_name: "",
    nickname: "",
    last_name: "",
    gender: "",
    dob: "",
    marital_status: "",
    nationality: "",
    national_id: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (initData?.national_id && !data.national_id) {
      setData((prev) => ({
        ...prev,
        national_id: initData.national_id,
      }));
    }
  }, [initData]);

  const _onChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const _onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrors({});
    setErrorMessage("");

    // Client-side required field checks
    if (!data.title || !data.gender || !data.marital_status) {
      const newErrors = {};
      if (!data.title) newErrors.title = "Title is required";
      if (!data.gender) newErrors.gender = "Gender is required";
      if (!data.marital_status) newErrors.marital_status = "Marital status is required";
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    const payload = {
      ...data,
      dob: data.dob ? moment(data.dob).format("YYYY-MM-DD") : "",
    };

    const res = await _registrationSubmit(payload);

    if (res.success) {
      router.push(
        "/register/contact-info?" +
          queryString.stringify({
            ...initData,
            ...res.data,
          })
      );
    } else {
      setErrors(res.errors || {});
      setErrorMessage(res.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={_onSubmit} className="relative w-full">
      <div>
        <h1>
          Welcome to <span className="text-secondary">StartUp</span>
        </h1>
        <p className="text-left">To get started complete the following</p>
      </div>

      {errorMessage && (
        <div className="my-7 max-w-lg mx-auto">
          <FormAlert error={true} message={errorMessage} />
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-7">
        <Select
          placeholder="Title *"
          options={titles.map((title) => ({ label: title, value: title }))}
          value={data.title}
          onChange={(value) => setData((prev) => ({ ...prev, title: value }))}
          error={errors.title}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-7 mt-4">
        <TextField
          required
          name="first_name"
          placeholder="First name *"
          value={data.first_name}
          onChange={_onChange}
        />
        <TextField
          name="middle_name"
          placeholder="Middle name"
          value={data.middle_name}
          onChange={_onChange}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-7 mt-2">
        <TextField
          required
          name="last_name"
          placeholder="Last name *"
          value={data.last_name}
          onChange={_onChange}
        />
        <TextField
          name="nickname"
          placeholder="Nickname"
          value={data.nickname}
          onChange={_onChange}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-7 mt-5">
        <Datepicker
          placeholder="YYYY-MM-DD*"
          value={{ startDate: data.dob, endDate: data.dob }}
          onChange={(value) =>
            setData((prev) => ({ ...prev, dob: value?.startDate || "" }))
          }
          asSingle
          required
          popoverDirection="down"
          useRange={false}
          displayFormat="YYYY-MM-DD"
          maxDate={new Date()}
          containerClassName="relative w-full flex h-[63px] mb-5"
          inputClassName="w-full bg-inherit px-4 py-1 text-[19px] font-[400] border border-gray rounded-lg hover:border-primary focus:border-primary"
        />

        <div className="grid md:grid-cols-5 gap-5">
          <div className="col-span-2">
            <Select
              placeholder="Gender *"
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
              ]}
              value={data.gender}
              onChange={(value) => setData((prev) => ({ ...prev, gender: value }))}
              error={errors.gender}
            />
          </div>

          <div className="col-span-3">
            <Select
              placeholder="Marital status *"
              options={[
                { label: "Single", value: "Single" },
                { label: "Married", value: "Married" },
              ]}
              value={data.marital_status}
              onChange={(value) =>
                setData((prev) => ({ ...prev, marital_status: value }))
              }
              error={errors.marital_status}
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-7 mt-3">
        <Select
          placeholder="Nationality *"
          options={nationalities.map((item) => ({ label: item, value: item }))}
          value={data.nationality}
          onChange={(value) =>
            setData((prev) => ({ ...prev, nationality: value }))
          }
          error={errors.nationality}
        />
        <TextField
          required
          name="national_id"
          value={data.national_id}
          placeholder="National ID *"
          onChange={_onChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-5 md:gap-7 mt-7">
        <div className="grid md:grid-cols-2 gap-7">
          <Link
            href="/"
            className="block w-full py-4 border-2 border-primary text-center font-semibold text-[16px] text-primary rounded-lg ring-primary hover:ring-1 hover:opacity-80"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary font-semibold text-[16px] text-white rounded-lg hover:opacity-80"
          >
            {loading ? "Loading..." : "Continue"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Basic;
