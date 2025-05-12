"use client";
import { useState } from "react";
import { _getCompanyById } from "@/apiServices/companyServices";

import {Chart as ChartJS,LineElement,CategoryScale,LinearScale,PointElement,Tooltip,ArcElement,Legend,} from "chart.js";
import Header from "@/components/sectors/company/Header";
import Sidebar from "@/components/sectors/company/Sidebar";
import EvaluationSection from "@/components/sectors/company/companySection/EvaluationSection";
import DocumentsSection from "@/components/sectors/company/companySection/DocumentSection";
import SummarySection from "@/components/sectors/company/companySection/Summary";
import DirectorsSection from "@/components/sectors/company/companySection/DirectorSection";
import AboutSection from "@/components/sectors/company/companySection/AboutSection";
import NewsSection from "@/components/sectors/company/companySection/NewsSection";
import CompetitionSectoin from "@/components/sectors/company/companySection/CompetitionSection";


ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ArcElement
);

const Client = ({company, error }) => {
  console.log('company',company);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("summary");

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSidebarOpen(false);
  };

  if (loading) return <p>Loading company details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!company) return <p className="text-center mt-8">Company not found.</p>;

  return (
    <div className="flex bg-[#f5f5f5] min-h-screen w-full">
      <Sidebar
        company={company}
        sections={["summary", "evaluations", "documents", "directors", "about","competitions","news"]}
        onSectionChange={handleSectionChange}
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen((prev) => !prev)}
        activeSection={activeSection}
      />
      <div className="w-full  md:w-4/5 p-0">
        <Header
          toggleSidebar={() => setSidebarOpen((prev) => !prev)}
          company={company}
        />
        <CompanyDetails company={company} activeSection={activeSection} />
      </div>
    </div>
  );
};

const CompanyDetails = ({ company, activeSection }) => (
  <div className="flex flex-col m-4">
    {renderActiveSection(activeSection, company)}
  </div>
);

const renderActiveSection = (activeSection, company) => {
  switch (activeSection) {
    case "summary":
      return <SummarySection company={company} />;
    case "evaluations":
      return <EvaluationSection company={company} />;
    case "documents":
      return <DocumentsSection company={company} />;
    case "directors":
      return <DirectorsSection company={company} />;
    case "about":
      return <AboutSection company={company} />;
    case "news":
      return <NewsSection news={company.company_updates} />;
      case "competitions":
        return <CompetitionSectoin competition={company.competition} />;
    default:
      return null;
  }
};
export default Client;