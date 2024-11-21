import React from 'react';

interface SpinnerProps {
  color?: string;    // Color for the spinner
  size?: string;     // Size of the spinner
  alignCenter?: boolean; // Whether to center the spinner horizontally and vertically
}

const Spinner: React.FC<SpinnerProps> = ({
  color = 'border-t-transparent',   // Default color if not provided
  size = 'h-8 w-8',                 // Default size if not provided
  alignCenter = true,               // Default alignment is true
}) => {
  const spinnerStyle = `${size} ${color} mr-2 animate-spin rounded-full border-4 border-solid`;
  const containerStyle = alignCenter ? 'flex justify-center items-center' : '';

  return (
    <div className={`${containerStyle} ${spinnerStyle}`}>
      {/* Spinner */}
    </div>
  );
};

export default Spinner;
