import Link from "next/link";
const { BsFilterRight } = require("react-icons/bs");

const Header = ({company,toggleSidebar }) => {
    return (
    <div className="bg-[#F1F1E9] w-full grid md:justify-start justify-between items-center p-6">
      <div className="grid grid-cols-2 md:gap-4 w-full mb-4">

        <button className="p-2 rounded-full md:hidden" onClick={toggleSidebar}>
          <BsFilterRight className="text-primary h-[50px] w-[50px]" />
        </button>

        <h4 className="text-[30px] md:text-[50px] md:ml-4 text-[#AFAFAF] font-bold justify-end md:justify-start col-start-2 md:col-start-1 md:text-left text-right">
          {company.company_data.company_name}
        </h4>
      </div>

      <div className="grid gap-10 md:grid-cols-4 md:ml-4">
        <div className="flex flex-col space-y-1 md:space-y-2">
         <p className="text-xl font-bold text-[#AFAFAF]" >Details: </p>
         <p>status: {company.company_data.status}</p>
         <p>location: {company.company_data.location}</p>
         <p>employees: {company.company_data.employees}</p>
         <p>visit website: <Link className="text-primary" href={company.company_data.website}>{company.company_data.website}</Link> </p>
        </div>

        <div className="flex flex-col space-y-1 md:space-y-2">
          <p className="text-xl font-bold text-[#AFAFAF]">Requests:</p>
          <p>Remaining Cash:  ${company.company_request_details.reamining_cash || 50}</p>
          <p>Remaining Cash: ${company.company_request_details.total_received_cash || 20}</p>
          <p>Remaining Cash: $ {company.company_request_details.total_required_cash || 30}</p>
        </div>
    
       

        <div className="flex flex-col space-y-1 md:space-y-2">
         <p className="text-xl font-bold text-[#AFAFAF]">Company Requests</p>
         <p>Request Status: {company.company_request.request_status}</p>
         <p>Request Type: {company.company_request.request_type}</p>
        </div>

      </div>
  
      
    </div>
  )};

  export default Header;