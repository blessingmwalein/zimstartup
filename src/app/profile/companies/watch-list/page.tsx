import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import WatchListTable from "@/components/Companies/Tables/WatchList";

const TablesPage = () => {
  return (
    <DefaultLayout>
      <div className="p-6">
        <Breadcrumb pageName="Watch List" />
      </div>
      <div className="flex flex-col gap-10 p-6">
        <WatchListTable />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
