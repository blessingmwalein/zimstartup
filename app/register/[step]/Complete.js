"use client";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const Complete = ({ initData }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    signIn("credentials", {
      ...initData,
      redirect: false,
    }).then(({ ok, error }) => {
      if (!ok && error) {
        setError(error);
      } else {
        setSuccess(true);
      }
    });
  }, [initData]);

  useEffect(() => {
    if (success) {
      location.reload();
    }
  }, [success]);

  return (
    <div>
      <div className="">
        <h1 className="">
          Welcome to <span className="text-secondary">StartUp</span>
        </h1>
        <p className="text-left leading-tight">Account creation completed</p>
      </div>

      <div className="mt-[20vh]">
        <Confetti width={window.innerWidth} height={window.innerHeight} />
        <h2 className="text-center text-blue-500">
          Thank you for completing <br /> your registration.
        </h2>
      </div>
    </div>
  );
};

export default Complete;
