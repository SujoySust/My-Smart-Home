import { Field, FieldProps } from "formik";
import React from "react";
import { FormFieldError } from "./FormFieldError";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  as?: string;
  className?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  disabled?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = "text",
  as,
  className = "",
  placeholder,
  options,
  disabled,
}) => {
  return (
    <Field name={name}>
      {({ field, form: { errors, touched } }: FieldProps) => (
        <div className="space-y-2">
          <Label htmlFor={name}>{label}</Label>
          {as === "select" ? (
            <select
              {...field}
              id={name}
              disabled={disabled}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                ${errors[name] && touched[name] ? "border-red-500" : ""} 
                ${className}`}
            >
              <option value="">{placeholder || `Select ${label}`}</option>
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : as === "textarea" ? (
            <Textarea
              {...field}
              placeholder={placeholder}
              disabled={disabled}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm 
              ${errors[name] && touched[name] ? "border-red-500" : ""} 
              ${className}`}
            />
          ) : (
            <Input
              {...field}
              id={name}
              disabled={disabled}
              type={type}
              placeholder={placeholder}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                        ${
                          errors[name] && touched[name] ? "border-red-500" : ""
                        } 
                        ${className}`}
            />
          )}

          <FormFieldError name={name} errors={errors} touched={touched} />
        </div>
      )}
    </Field>
  );
};
