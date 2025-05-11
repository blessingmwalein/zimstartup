import React from "react";
import clsx from "clsx"; // For conditionally applying classes

interface ButtonProps {
  type: "button" | "submit" | "reset"; // For form submission buttons
  variant: "solid" | "outlined"; // Button style type
  color?: string; // Custom color for button
  isLoading?: boolean; // Show loading state
  isDisabled?: boolean; // Disable the button
  icon?: React.ReactNode; // Icon to display inside the button
  children: React.ReactNode; // Button label
  onClick?: () => void; // Button click handler
}

const CustomButton: React.FC<ButtonProps> = ({
  type,
  variant,
  color = "#001f3f",
  isLoading = false,
  isDisabled = false,
  icon,
  children,
  onClick,
}) => {
  const baseStyles = "flex-1 py-3 rounded-md flex justify-center items-center gap-2";
  const solidStyles = clsx(
    "text-white bg-[#001f3f]",
    isDisabled && "bg-gray-400 cursor-not-allowed",
    isLoading && "bg-opacity-50"
  );
  const outlinedStyles = clsx(
    `border border-[${color}] text-[${color}]`,
    isDisabled && "border-gray-400 text-gray-400 cursor-not-allowed",
    isLoading && "opacity-50"
  );

  const buttonStyles = variant === "solid" ? solidStyles : outlinedStyles;

  return (
    <button
      type={type}
      className={`${baseStyles} ${buttonStyles}`}
      onClick={onClick}
      disabled={isDisabled || isLoading}
    >
      {isLoading ? (
        <span className="loader">
            Loading...
        </span> // Add a spinner here for loading
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default CustomButton;
