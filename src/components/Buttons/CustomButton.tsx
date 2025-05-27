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
  borderRadius?: string;
  fullWidth?: boolean; // 👈 Optional prop to enable full width
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
  borderRadius = "rounded-[10px]",
  fullWidth = false, // 👈 default false
}) => {
  const baseStyles = clsx(
    "py-3 flex justify-center items-center gap-2 px-3",
    borderRadius,
    fullWidth && "w-full" // 👈 Apply full width if enabled
  );

  const solidStyles = clsx(
    "text-white bg-[#001f3f]",
    isDisabled && "bg-gray-400 cursor-not-allowed",
    isLoading && "bg-opacity-50"
  );

  const outlinedStyles = clsx(
    `border text-[${color}] border-[${color}]`,
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
