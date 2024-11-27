import React from "react";

interface DateDisplayProps {
  date: string;
}

const DateDisplay: React.FC<DateDisplayProps> = ({ date } ) => {
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <span
      className="inline-block rounded-full bg-gray-300 px-4 py-1 text-sm text-gray-800 transition duration-200 ease-in-out hover:bg-gray-400 cursor-pointer"
      title={formattedDate}
    >
      {formattedDate}
    </span>
  );
};

export default DateDisplay;
