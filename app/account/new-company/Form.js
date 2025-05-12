"use client";

import TextField from "@/components/material/TextField";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { _registrationSubmit } from "@/clientServices/auth";
import FormAlert from "@/components/material/FormAlert";
import company_sectors from "@/utils/company_sectors";
import TextArea from "@/components/material/TextArea";
import Select from "@/components/material/Select";
import industry_ids from "@/utils/industry_ids";
import stock_ids from "@/utils/stock_ids";
import business_states from "@/utils/business_states";
import Datepicker from "react-tailwindcss-datepicker";
import { _checkCompanyAvailabilitySubmit } from "@/clientServices/company";
import PhoneTextField from "@/components/material/PhoneTextField";

const CompanyForm = () => {
  const [loading, setLoading] = useState(false);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [error_message, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [available, setAvailable] = useState(false);
  const [data, setData] = useState({
    step: "company",
    company_name: "",
    company_abbreviations: "",
    company_short_description: "",
    company_start_date: "",
    location: "",
    employees: "",
    industry_id: "",
    stock_id: "",
    website: "",
    business_state: "",
    phone: "",
    email: "",
    x_url: "",
    facebook_url: "",
    linkedin_url: "",
  });

  const router = useRouter();

  function _onChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setData((prevState) => {
      return { ...prevState, [name]: value };
    });
  }
  function _onReset() {
    setAvailable(false);
    setData({
      step: "company",
      company_name: "",
      company_abbreviations: "",
      company_short_description: "",
      company_start_date: "",
      location: "",
      employees: "",
      industry_id: "",
      stock_id: "",
      website: "",
      business_state: "",
      phone: "",
      email: "",
      x_url: "",
      facebook_url: "",
      linkedin_url: "",
    });
  }

  async function _onCheckName() {
    setAvailabilityLoading(true);
    setErrorMessage("");
    setErrors({});

    if (!data.company_name) {
      setAvailabilityLoading(false);
      setErrorMessage("");
      setErrors({ company_name: "Company name is required" });
      return;
    }
    const res = await _checkCompanyAvailabilitySubmit({
      company_name: data.company_name,
    });

    if (res.success) {
      setAvailable(true);
    } else {
      setErrorMessage(res.message);
      setErrors({ company_name: res.inputError });
    }

    setAvailabilityLoading(false);
  }

  async function _onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setErrors({});
    setErrorMessage("");

    const errors2 = {};
    if (!data.industry_id) {
      errors2.industry_id = "Industry ID is required";
    }

    if (!data.stock_id) {
      errors2.stock_id = "Stock ID is required";
    }

    if (!data.business_state) {
      errors2.business_state = "Business state is required";
    }
    if (!data.company_start_date) {
      errors2.company_start_date = "Company start date is required";
    }

    if (Object.keys(errors2).length > 0) {
      setErrors(errors2);
      setLoading(false);
      setErrorMessage("Missing values");
      return;
    }

    const res = await _registrationSubmit(data);

    if (res.success) {
      router.push("/account/profile");
    } else {
      setErrors(res.errors || {});
      setLoading(false);
      setErrorMessage(res.message);
    }
  }

  return (
    <form onSubmit={_onSubmit} className="relative w-full   ">
      <div className="">
        <p className="text-left">
          {available
            ? "Give Us Information About Your Company"
            : "Lets Make Sure The Company Does Not Already Exist"}
        </p>
      </div>

      <div className="my-7 max-w-lg mx-auto">
        <FormAlert error={Boolean(error_message)} message={error_message} />
      </div>

      <div className="">
        <TextField
          required={true}
          disabled={available}
          name="company_name"
          placeholder="Company legal name*"
          value={data.company_name}
          onChange={_onChange}
          error={errors.company_name}
          containerClassName="mb-[0px]"
        />

        {available && (
          <button
            type="button"
            disabled={loading}
            onClick={_onReset}
            className="py-1 px-3 text-secondary text-[15px] mb-3 rounded-full hover:underline">
            Change company name
          </button>
        )}

        {!available && (
          <div className="grid grid-cols-2  gap-5 md:gap-7 mt-7">
            <div className="grid md:grid-cols-2 gap-7 mt-2">
              <div className="col-span-2">
                <button
                  type="button"
                  onClick={_onCheckName}
                  disabled={availabilityLoading}
                  className=" w-full py-4 bg-primary font-[600] text-[16px] text-white rounded-lg hover:opacity-80">
                  {availabilityLoading ? "loading..." : "Continue"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {available && (
        <div>
          <div className="grid md:grid-cols-2 gap-7 mt-4">
            <TextField
              required={true}
              name="company_abbreviations"
              placeholder="Company Abbreviations"
              value={data.company_abbreviations}
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

          <div className="grid md:grid-cols-3  gap-7 mt-5 ">
            <div>
              <label className="label">Company start date *</label>
              <Datepicker
                placeholder={null}
                value={{
                  startDate: data.company_start_date,
                  endDate: data.company_start_date,
                }}
                onChange={(value) => {
                  setData((prevState) => ({
                    ...prevState,
                    company_start_date: value.startDate,
                  }));
                }}
                asSingle={true}
                popoverDirection="down"
                useRange={false}
                displayFormat={"YYYY-MM-DD"}
                maxDate={new Date()}
                containerClassName="relative w-full flex h-[63px] mb-5"
                inputClassName="w-full  bg-[inherit] px-4 py-1  text-[19px] font-[400]  border border-gray rounded-lg hover:border-primary focus:border-primary "
              />
              {errors.company_start_date && (
                <p className="text-error text-[12px] font-[300]">
                  {errors.company_start_date}
                </p>
              )}
            </div>
            <div>
              <label className="label">Business State*</label>
              <Select
                placeholder=""
                options={business_states.map((item) => {
                  return { value: item, label: item };
                })}
                value={data.business_state}
                onChange={(value) =>
                  setData((prevState) => {
                    return { ...prevState, business_state: value };
                  })
                }
                error={errors?.business_state}
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
            <div>
              <label className="label">Industry ID*</label>
              <Select
                placeholder=""
                options={industry_ids.map((item) => {
                  return { value: item, label: item };
                })}
                value={data.industry_id}
                onChange={(value) =>
                  setData((prevState) => {
                    return { ...prevState, industry_id: value };
                  })
                }
                error={errors?.industry_id}
              />
            </div>

            <div>
              <label className="label">Stock ID*</label>
              <Select
                placeholder=""
                options={stock_ids.map((item) => {
                  return { value: item, label: item };
                })}
                value={data.stock_id}
                onChange={(value) =>
                  setData((prevState) => {
                    return { ...prevState, stock_id: value };
                  })
                }
                error={errors?.stock_id}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-7 mt-4">
            <div>
              <label className="label"> Phone *</label>
              <PhoneTextField
                value={data.phone}
                country="zw"
                onChange={(value) =>
                  setData((prevState) => {
                    return { ...prevState, phone: value };
                  })
                }
              />
            </div>

            <div>
              <label className="label"></label>
              <TextField
                required={true}
                name="email"
                placeholder="Email *"
                type="email"
                value={data.email}
                onChange={_onChange}
                error={errors?.email}
              />
            </div>
          </div>

          <div className=" mt-3 md:mt-7">
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

          <div className="grid md:grid-cols-3 gap-7 mt-4">
            <TextField
              required={true}
              name="x_url"
              placeholder="X Url"
              value={data.x_url}
              onChange={_onChange}
            />
            <TextField
              required={true}
              name="facebook_url"
              placeholder="Facebook Url"
              value={data.facebook_url}
              onChange={_onChange}
            />
            <TextField
              required={true}
              name="linkedin_url"
              placeholder="LinkedIn Url"
              value={data.linkedin_url}
              onChange={_onChange}
            />
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2  gap-5 md:gap-7 mt-7">
            <div className="grid md:grid-cols-2 gap-7 mt-2">
              <div className="col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className=" w-full py-4 bg-primary font-[600] text-[16px] text-white rounded-lg hover:opacity-80">
                  {loading ? "loading..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default CompanyForm;
