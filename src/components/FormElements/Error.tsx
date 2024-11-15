// components/FormError.tsx
import React from 'react';

interface FormErrorProps {
  message: string | null | undefined;  // Allow message to be null or undefined
}

const FormError: React.FC<FormErrorProps> = ({ message }) => {
  if (!message) return null;  // Return null if message is falsy (null, undefined, or empty string)

  return <p className="error text-red mt-2">{message}</p>;
};

export default FormError;
