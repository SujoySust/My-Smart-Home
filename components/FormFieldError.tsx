import { FormikErrors, FormikTouched } from "formik";
import React from "react";

interface FormFieldErrorProps {
  name: string;
  errors?: FormikErrors<any>;
  touched?: FormikTouched<any>;
  className?: string;
}

export const FormFieldError: React.FC<FormFieldErrorProps> = ({
  name,
  errors,
  touched,
  className,
}) => {
  // Return null if field hasn't been touched or there are no errors
  if (!touched?.[name] || !errors?.[name]) return null;

  const error = errors[name];
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
