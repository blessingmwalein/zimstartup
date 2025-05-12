"use client";

import Select from "@/components/material/Select";
import TextField from "@/components/material/TextField";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { _registrationSubmit } from "@/clientServices/auth";
import FormAlert from "@/components/material/FormAlert";
import company_sectors from "@/utils/company_sectors";
import TextArea from "@/components/material/TextArea";

const titles = ["Mr", "Ms", "Mrs", "Miss", "Dr", "Prof", "Ps"];

const Company = () => {
  const [loading, setLoading] = useState(false);
  const [error_message, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    step: "company",
    company_name: "",
    company_abbreviations_name: "",
    company_short_description: "",
    company_start_date: "",
    location: "",
    employees: "",
    industry_id: "",
    stock_id: "",
    wesite: "",
    business_state: "",
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

    const res = await _registrationSubmit(data);

    if (res.success) {
      router.push("/register/basic");
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
        <p className="text-left">
          To get started give us Information about your company
        </p>
      </div>

      <div className="my-7 max-w-lg mx-auto">
        <FormAlert error={Boolean(error_message)} message={error_message} />
      </div>

      <div className="grid md:grid-cols-2 gap-7 mt-4">
        <TextField
          required={true}
          name="company_name"
          placeholder="Company legal name*"
          value={data.company_name}
          onChange={_onChange}
        />

        <TextField
          required={true}
          name="company_abbreviations_name"
          placeholder="Trade name"
          value={data.company_abbreviations_name}
          onChange={_onChange}
        />
      </div>

      <div className=" mt-3">
        <TextArea
          required={true}
          name="company_short_description"
          placeholder="Company short description*"
          rows={3}
          value={data.company_short_description}
          onChange={_onChange}
        />
      </div>

      <div className="grid md:grid-cols-2  gap-7 mt-5 ">
        {/* <Select
          placeholder="Sector *"
          options={company_sectors.map((item) => {
            return { label: item, value: item };
          })}
          value={data.sector}
          onChange={(value) =>
            setData((prevState) => {
              return { ...prevState, sector: value };
            })
          }
          error={errors.sector}
        /> */}
        <div>
          <label className="label">Company start date *</label>

          <TextField
            required={true}
            name="company_start_date"
            placeholder="Company start date*"
            type={"date"}
            value={data.company_start_date}
            onChange={_onChange}
          />
        </div>
        <div>
          <label className="label"></label>
          <TextField
            required={true}
            name="employees"
            placeholder="Number of employees*"
            type={"number"}
            value={data.employees}
            onChange={_onChange}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-7 mt-4">
        <TextField
          name="industry_id"
          placeholder="Industry ID"
          value={data.industry_id}
          onChange={_onChange}
        />

        <TextField
          name="stock_id"
          placeholder="Stock ID"
          value={data.stock_id}
          onChange={_onChange}
        />
      </div>

      <div className=" mt-3">
        <TextField
          required={true}
          name="location"
          placeholder="Company address*"
          value={data.location}
          onChange={_onChange}
        />
      </div>

      <div className="lg:w-[70%] mt-4">
        <TextField
          required={true}
          name="website"
          placeholder="Company website*"
          value={data.website}
          onChange={_onChange}
        />
      </div>

      <div className="lg:w-[75%] mt-4">
        <TextField
          required={true}
          name="business_state"
          placeholder="Business state*"
          value={data.business_state}
          onChange={_onChange}
        />
      </div>

      {/* <hr className="my-7" />

      <h2 className="text-[20px] font-[400] mb-4">What are you looking for</h2>

      <p className="text-red-400">
        Type of investment that the person is looking for, for this company
      </p> */}

      {/* Actions */}
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

export default Company;
