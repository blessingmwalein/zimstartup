"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import TableThree from "@/components/Tables/TableThree";

const Companies: React.FC = () => {
  

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-full px-4">
        <Breadcrumb pageName="Companies" />
        <div className="flex flex-col gap-10">
        
        <TableThree />
      </div>
      </div>
    </DefaultLayout>
  );
};

export default Companies;
