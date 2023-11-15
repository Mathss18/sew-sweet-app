import React, { ComponentProps, forwardRef } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors } from "react-hook-form";
import { cn } from "@/helpers";

type Props = {
  variant?: "filled" | "outlined";
  label?: string;
  className?: string;
  errors?: FieldErrors;
} & ComponentProps<"input">;

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ variant = "filled", className, label, name, errors, ...props }, ref) => {
    const defaultClasses =
      "rounded-lg h-10 border-2 border-solid outline-none text-black flex items-center gap-2 px-4 py-2 text-md rounded focus:outline-none";

    const variants = {
      filled: "border bg-gray-100 text-black placeholder-gray-400",
      outlined: "border bg-transparent text-black placeholder-gray-400",
    };
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={name}
            className="block text-lg font-normal text-gray-900"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          name={name}
          className={cn(
            defaultClasses,
            variants[variant],
            className,
            errors && errors[name!] ? "border-red-500" : ""
          )}
          {...props}
        />
        {errors && name && (
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="mt-0 text-red-500">{message}</p>
            )}
          />
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
