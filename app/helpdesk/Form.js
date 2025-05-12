"use client";

import FormAlert from "@/components/material/FormAlert";
import Select from "@/components/material/Select";
import TextArea from "@/components/material/TextArea";
import TextField from "@/components/material/TextField";
import axios from "axios";
import { useState } from "react";

const categories = [
  { label: "Technical Issues", value: "Technical Issues" },
  { label: "General Inquiries", value: "General Inquiries" },
  { label: "Billing and Payments", value: "Billing and Payments" },
  { label: "Account and Profile", value: "Account and Profile" },
  { label: "Sales and Marketing", value: "Sales and Marketing" },
  { label: "Customer Support", value: "Customer Support" },
  { label: "Other", value: "ther" },
];

const HelpdeskForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    name: "",
    email: "",
    category: "",
    subject: "",
    description: "",
    status: "Open",
  });

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
    setSuccess("");
    setError("");

    try {
      const { data: res } = await axios.post("/api/general/helpdesk", data);

      if (res.success) {
        setSuccess("Successfully submitted.");

        setData({
          name: "",
          email: "",
          category: "",
          subject: "",
          description: "",
          status: "Open",
        });
      } else {
        setError(res.message);
        setErrors(res.errors);
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again later.");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={_onSubmit} className="max-w-[900px] w-full mx-auto">
      <h1 className="mb-5">How can we help you?</h1>

      {error && <FormAlert error={true} message={error} />}
      {success && <FormAlert success={true} message={success} />}
      <div className="h-3" />
      <TextField
        required={true}
        name="name"
        value={data.name}
        onChange={_onChange}
        placeholder="Enter your name"
        className="border-[#AFAFAF] border-2 "
        error={errors?.name}
      />

      <TextField
        required={true}
        name="email"
        value={data.email}
        onChange={_onChange}
        placeholder="Enter your email"
        type="email"
        className="border-[#AFAFAF] border-2 "
        error={errors?.email}
      />

      <br />

      <Select
        placeholder="Category *"
        options={categories}
        value={data.category}
        onChange={(value) =>
          setData((prevState) => {
            return { ...prevState, category: value };
          })
        }
        error={errors?.category}
      />

      <TextField
        required={true}
        name="subject"
        value={data.subject}
        onChange={_onChange}
        placeholder="Subject"
        className="border-[#AFAFAF] border-2 mt-4  "
        error={errors?.subject}
      />

      <TextArea
        required={true}
        name="description"
        value={data.description}
        onChange={_onChange}
        placeholder="Description"
        className="border-[#AFAFAF] border-2  mt-0"
        error={errors?.description}
      />

      <button
        type="submit"
        disabled={loading}
        className=" w-full py-4 mt-7 bg-primary font-[600] text-[16px] text-white rounded-lg hover:opacity-80">
        {loading ? "loading..." : "Submit"}
      </button>
    </form>
  );
};

export default HelpdeskForm;
