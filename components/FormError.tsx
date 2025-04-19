import { FormikErrors } from "formik";
import React from "react";

interface FormErrorProps {
  error?: string | string[] | FormikErrors<any> | undefined;
  className?: string;
}

export const FormError: React.FC<FormErrorProps> = ({ error, className }) => {
  if (!error) return null;

  const errorMessage =
    typeof error === "string"
      ? error
      : Array.isArray(error)
      ? error[0]
      : typeof error === "object" && error !== null
      ? Object.values(error)[0]
      : error;

  return (
    <div
      className={`text-sm text-red-500 mt-1 ${className || ""}`}
      role="alert"
    >
      {errorMessage?.toString()}
    </div>
  );
};
