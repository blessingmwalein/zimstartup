"use client"

import type React from "react"
import clsx from "clsx"

interface ButtonProps {
  type?: "button" | "submit" | "reset"
  variant: "solid" | "outlined"
  color?: string
  isLoading?: boolean
  isDisabled?: boolean
  icon?: React.ReactNode
  children: React.ReactNode
  onClick?: () => void
  borderRadius?: string
  fullWidth?: boolean // 👈 Optional prop to enable full width
  className?: string
  size?: "sm" | "md" | "lg"
}

const CustomButton: React.FC<ButtonProps> = ({
  type = "button",
  variant,
  color = "#001f3f",
  isLoading = false,
  isDisabled = false,
  icon,
  children,
  onClick,
  borderRadius = "rounded-[10px]",
  fullWidth = false, // 👈 default false
  className,
  size = "md",
}) => {
  const sizeStyles = {
    sm: "py-2 px-2 text-sm",
    md: "py-3 px-3",
    lg: "py-4 px-4 text-lg",
  }
  const baseStyles = clsx(
    "flex justify-center items-center gap-2",
    sizeStyles[size],
    borderRadius,
    fullWidth && "w-full", // 👈 Apply full width if enabled
    className,
  )

  const solidStyles = clsx(
    "text-white bg-[#001f3f]",
    isDisabled && "bg-gray-400 cursor-not-allowed",
    isLoading && "bg-opacity-50",
  )

  const outlinedStyles = clsx(
    `border text-[${color}] border-[${color}]`,
    isDisabled && "border-gray-400 text-gray-400 cursor-not-allowed",
    isLoading && "opacity-50",
  )

  const buttonStyles = variant === "solid" ? solidStyles : outlinedStyles

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
  )
}

export default CustomButton
