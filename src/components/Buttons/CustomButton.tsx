import React from "react";
import clsx from "clsx";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  variant: "solid" | "outlined";
  color?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  borderRadius?: string; // 👈 New prop for custom border radius
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
  borderRadius = "rounded-md", // 👈 Default to rounded-md
}) => {
  const baseStyles = clsx(
    "flex-1 py-3 flex justify-center items-center gap-2 px-3",
    borderRadius // 👈 Apply custom border radius
  );

  const solidStyles = clsx(
    "text-white bg-[#001f3f]",
    isDisabled && "bg-gray-400 cursor-not-allowed",
    isLoading && "bg-opacity-50"
  );

  const outlinedStyles = clsx(
    `border text-[${color}]`,
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
        <span className="loader">Loading...</span>
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
