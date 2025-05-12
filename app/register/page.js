import { redirect } from "next/navigation";
import React from "react";

const Register = async () => {
  redirect("/register/type");
  return <div>Register</div>;
};

export default Register;
