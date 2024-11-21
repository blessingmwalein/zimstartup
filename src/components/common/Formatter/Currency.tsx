import React from "react";

interface CurrencyDisplayProps {
  amount: number;
  currency: string;
}

const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({
  amount,
  currency,
}) => {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);

  return (
    <span className="text-sm font-medium text-gray-700">{formattedAmount}</span>
  );
};

export default CurrencyDisplay;
