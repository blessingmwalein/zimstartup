import React from "react";

// Helper function to generate a random background color
const getRandomColor = () => {
  const colors = [
    "#FF5733"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

interface InitialsAvatarProps {
  firstName: string;
  lastName: string;
  size?: string | number; // Optional prop to set the size of the circle (default: 3rem)
}

const InitialsAvatar: React.FC<InitialsAvatarProps> = ({ firstName, lastName, size = "3rem" }) => {
  // Get the initials (first letter of the first and last name)
  const initials = (firstName![0] + lastName![0]).toUpperCase();

  // Generate a random background color for the circle
  const backgroundColor = getRandomColor();

  // Calculate font size relative to circle size
  const fontSize = typeof size === 'string' && size.includes('rem') 
    ? `calc(${size} / 2)` 
    : `${Math.min(Number(size) / 2, 2)}px`; // Ensures the font size doesn't exceed a reasonable limit

  return (
    <div
      className="flex items-center justify-center text-white font-bold"
      style={{
        backgroundColor: backgroundColor,
        borderRadius: "50%",
        width: size,
        height: size,
        fontSize: fontSize,
      }}
    >
      {initials}
    </div>
  );
};

export default InitialsAvatar;
