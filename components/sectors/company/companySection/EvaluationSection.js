import { Card } from "flowbite-react";
import { Line } from "react-chartjs-2";

const EvaluationSection = ({ company }) => {
  return (
    <div className="m-4 overflow-hidden">
      <h5 className="mt-4 text-2xl font-bold text-primary">
        Valuation Evaluations
      </h5>
      {Array.isArray(company.company_valuation) &&
      company.company_valuation.length > 0 ? (
        <div className="flex flex-wrap justify-center">
          {company.company_valuation.map(
            ({
              valuation_id,
              valuation_date,
              valuation_amount,
              current_growth_rate,
              notes,
            }) => (
              <ValuationCard
                key={valuation_id}
                valuation_date={valuation_date}
                valuation_amount={valuation_amount}
                current_growth_rate={current_growth_rate}
                notes={notes}
              />
            )
          )}
        </div>
      ) : (
        <p>No valuation evaluations available.</p>
      )}
    </div>
  );
};

const ValuationCard = ({
  valuation_date,
  valuation_amount,
  current_growth_rate,
  notes,
}) => {
  const data = {
    labels: [valuation_date || "N/A"],
    datasets: [
      {
        label: "Valuation Amount",
        data: [valuation_amount || 0],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const isNegativeGrowth = current_growth_rate < 0;
  const arrowDirection = isNegativeGrowth ? "↓" : "↑";
  const arrowColor = isNegativeGrowth ? "text-red-500" : "text-green-500";

  return (
    <Card className="flex-1 m-2 max-w-xs md:max-w-lg mx-auto shadow-md border-none">
      <div className="p-4">
        <div className="flex justify-between">
          <h6 className="text-sm md:text-lg font-semibold text-gray-900">
            {valuation_date || "N/A"}
          </h6>
          <p className="font-normal text-sm md:text-lg text-gray-700">{`Amount: $${
            valuation_amount || "N/A"
          }`}</p>
        </div>
        <div className="w-full bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex justify-between">
            <h5 className="leading-none text-lg md:text-3xl font-bold text-gray-900 pb-2">
              Growth Rate
            </h5>
            <hr className="my-2 h-0.5 border-t-0 bg-neutral-100 opacity-100" />
            <div
              className={`flex items-center px-2.5 py-0.5 text-base font-semibold ${arrowColor}`}>
              {`${current_growth_rate || "N/A"}% ${arrowDirection}`}
            </div>
          </div>
          <Line data={data} />
        </div>
        <p className="font-normal text-gray-700">{`Notes: ${
          notes || "N/A"
        }`}</p>
      </div>
    </Card>
  );
};
export default EvaluationSection;