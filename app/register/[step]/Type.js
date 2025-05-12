"use client";

import Select from "@/components/material/Select";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { _registrationSubmit } from "@/clientServices/auth";
import { useRouter } from "next/navigation";
import FormAlert from "@/components/material/FormAlert";
import CheckBox from "@/components/material/CheckBox";
import { _setCompanyReg } from "@/redux/slices/generalSlice";
import queryString from "querystring";

const Type = () => {
  const [loading, setLoading] = useState(false);
  const [error_message, setErrorMessage] = useState("");
  const [company_reg, setCompanyReg] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    step: "type",
    national_id: "",
    reason: "",
    place: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const investor_types = useSelector((state) => state.general.investor_types);

  useEffect(() => {
    if (data.reason.includes("company")) {
      setCompanyReg(false);
      dispatch(_setCompanyReg({ company_reg: false }));
    } else {
      setCompanyReg(false);
      dispatch(_setCompanyReg({ company_reg: false }));
    }
  }, [data.reason, dispatch]);

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

    const res = await _registrationSubmit(data);

    if (res.success) {
      router.push("/register/basic?" + queryString.stringify(res.data));
    } else {
      setErrors(res.errors || {});
      setLoading(false);
      setErrorMessage(res.message);
    }
  }

  return (
    <form
      onSubmit={_onSubmit}
      className="relative w-full  max-w-2xl p-[5px] sm:p-[50px] ">
      <div className="">
        <h1 className="">
          Welcome to <span className="text-secondary">StartUp</span>
        </h1>
        <p className="text-left">To get started complete the following</p>
      </div>

      <div className="my-11">
        <FormAlert error={Boolean(error_message)} message={error_message} />

        {/* <Select
          placeholder="Type of Investor"
          options={
            investor_types?.map((type) => {
              return { label: type, value: type };
            }) || []
          }
          value={data.reason}
          onChange={(value) =>
            setData((prevState) => ({ ...prevState, reason: value }))
          }
          error={errors?.reason}
        /> */}

        <p className="text-[#606160] mt-9 text-[19px]  mb-3">Investor type*</p>

        <div className="grid grid-cols-2 gap-5 mb-12">
          {investor_types.map((type, index) => (
            <div key={index} className=" ">
              <CheckBox
                value={type}
                checked={data.reason.includes(type)}
                _onChange={(value) => {
                  let reason = data.reason;
                  if (reason && reason.includes(value)) {
                    reason = reason.replace(value + ".", "");
                  } else {
                    reason = reason + value + ".";
                  }
                  setData((prevState) => {
                    return { ...prevState, reason };
                  });
                }}
                label={type}
              />
            </div>
          ))}
        </div>

        <p className="label">Location*</p>
        <Select
          placeholder="Current location"
          options={[
            { label: "Currently in Zimbabwe", value: "Currently in Zimbabwe" },
            {
              label: "Currently outside Zimbabwe",
              value: "Currently outside Zimbabwe",
            },
          ]}
          value={data.place}
          onChange={(value) =>
            setData((prevState) => ({ ...prevState, place: value }))
          }
          error={errors?.place}
        />
      </div>

      <div className="grid grid-cols-2 gap-7 mt-2">
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
            {loading ? "loading..." : "Continue"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Type;
