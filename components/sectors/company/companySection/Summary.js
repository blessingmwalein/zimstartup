import { Pie } from "react-chartjs-2";

const SummarySection = ({ company }) => {
  const remainingCash = company.company_request_details.remaining_cash || 20;
  const totalReceivedCash = company.company_request_details.total_received_cash || 50;
  const totalRequiredCash = company.company_request_details.total_required_cash || 30;

  const data = {
    labels: ["Remaining Cash", "Total Received Cash", "Total Required Cash"],
    datasets: [
      {
        data: [remainingCash, totalReceivedCash, totalRequiredCash],
        backgroundColor: ["#10454F", "#042940", "#818274"],
        hoverBackgroundColor: ["#10454F", "#042940", "#818274"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
      },
    },
  };

  return (
    <div className="flex flex-col items-center min-h-screen m-2 p-2 md:p-4">
      <div className="w-full md:w-1/2 h-96 justify-center ">
        <Pie data={data} options={options} />
      </div>
      <h5 className="my-2 md:my-8 text-3xl md:text-4xl font-bold text-[#AFAFAF] md:self-start">Summary</h5>
      <p className="mx-2 my-4 md:my-0 md:m-3 text-[14px] md:text-[16px]">
        {company.company_data.company_short_description ||
          "No description available."}
      </p> 

      <h5 className="my-2 text-3xl md:mt-10 md:text-4xl font-bold text-[#AFAFAF] md:self-start">Request Details</h5>
      <div className="bg-[#052941]  shadow-md rounded-lg w-auto h-auto p-4 self-center md:self-start mt-2 md:mt-4">
       <div className="grid grid-cols-1 text-secondary  md:grid-cols-4 gap-4">
        {company.company_valuation?.map((valuation) => (
          <div
            className="flex flex-col space-y-2 text-secondary p-4"
            key={valuation.valuation_id}
          >
            <p className="text-xl font-bold text-[#AFAFAF]">
              Valuation <span className="ml-2">{valuation.valuation_id}</span>:
            </p>
            <p>Growth Rate: {valuation.current_growth_rate}%</p>
            <p>Financial Period: {valuation.financial_period}</p>
            <p>Amount: {valuation.valuation_amount}</p>
            <p>Currency: {valuation.valuation_currency}</p>
        </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default SummarySection;
