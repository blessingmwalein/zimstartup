import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import store from "../../state/store";
import { Provider } from 'react-redux';


export const metadata: Metadata = {
  title:
    "Zimstartup",
  description: "Zimstart Up Website",
};

export default function Home() {
  return (
    <>
    
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
     
    </>
  );
}


