"use client";

import TextField from "@/components/material/TextField";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PhoneTextField from "@/components/material/PhoneTextField";
import { _registrationSubmit } from "@/clientServices/auth";
import FormAlert from "@/components/material/FormAlert";
import queryString from "querystring";

const Contact = ({ initData }) => {
  const [loading, setLoading] = useState(false);
  const [error_message, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    step: "contact",
    email: "",
    work_email: "",
    phone1: "",
    phone2: "",
    address1: "",
    address2: "",
    town: "",
    city: "",
    state: "",
    postal_code: "",
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

    const res = await _registrationSubmit({
      id: initData.id,
      national_id: initData.national_id,
      ...data,
      address2: "string",
    });

    if (res.success) {
      router.push(
        "/register/credentials?" +
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
  }

  return (
    <form onSubmit={_onSubmit} className="relative w-full   ">
      <div className="">
        <h1 className="">
          Welcome to <span className="text-secondary">StartUp</span>
        </h1>
        <p className="text-left">To get started complete the following</p>
      </div>

      <div className="my-7 max-w-lg mx-auto">
        <FormAlert error={Boolean(error_message)} message={error_message} />
      </div>

      <div className="grid md:grid-cols-2 gap-7 ">
        <TextField
          required={true}
          name="email"
          placeholder="Email *"
          type="email"
          value={data.email}
          onChange={_onChange}
          error={errors?.email}
        />

        <TextField
          name="work_email"
          placeholder="Work email"
          type="email"
          value={data.work_email}
          onChange={_onChange}
          error={errors?.work_email}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-7 mt-2">
        <div>
          <label className="label"> Phone 1 *</label>
          <PhoneTextField
            value={data.phone1}
            country="zw"
            onChange={(value) =>
              setData((prevState) => {
                return { ...prevState, phone1: value };
              })
            }
          />
        </div>

        <div>
          <label className="label"> Phone 2</label>
          <PhoneTextField
            value={data.phone2}
            country="zw"
            onChange={(value) =>
              setData((prevState) => {
                return { ...prevState, phone2: value };
              })
            }
          />
        </div>
      </div>

      <div className="grid md:grid-cols-1 gap-7 mt-3">
        <TextField
          required={true}
          name="address1"
          value={data.address1}
          placeholder="Street address *"
          onChange={_onChange}
          error={errors?.address1}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-7 mt-3">
        <TextField
          required={true}
          name="town"
          value={data.town}
          placeholder="Town *"
          onChange={_onChange}
          error={errors?.town}
        />
        <TextField
          required={true}
          name="city"
          value={data.city}
          placeholder="City *"
          onChange={_onChange}
          error={errors?.city}
        />

        <TextField
          required={true}
          name="state"
          value={data.state}
          placeholder="State *. e.g Zimbabwe"
          onChange={_onChange}
          error={errors?.state}
        />

        <TextField
          name="postal_code"
          value={data.postal_code}
          placeholder="Postal code (optional)"
          onChange={_onChange}
          className="max-w-[170px]"
          error={errors?.postal_code}
        />
      </div>

      <div className="grid grid-cols-2  gap-5 md:gap-7 mt-7">
        <div className="grid md:grid-cols-2 gap-7 mt-2">
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
              className=" w-full py-4 bg-primary font-[600] text-[16px] text-white rounded-lg hover:opacity-80">
              {loading ? "loading..." : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Contact;
