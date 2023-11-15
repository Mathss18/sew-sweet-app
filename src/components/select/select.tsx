import { FieldErrors } from "react-hook-form";
import ReactSelect, { Props as ReactSelectProps } from "react-select";
import { cn } from "@/helpers";
import clsx from "clsx";
import { ErrorMessage } from "@hookform/error-message";

export type Option = {
  label: string;
  value: unknown;
};

export type LabeledOption = {
  label: string;
  options: Option[];
};

type Props = {
  variant?: "filled" | "outlined";
  label?: string;
  name: string;
  className?: string;
  errors?: FieldErrors;
  options: Option[] | LabeledOption[];
} & ReactSelectProps;

export const Select = ({
  className,
  variant = "filled",
  label,
  value,
  errors,
  name,
  options = [],
  ...props
}: Props): JSX.Element => {
  const defaultClasses =
    "rounded-lg h-10 border-2 border-solid outline-none text-black px-4 text-md rounded focus:outline-none";

  const variants = {
    filled: "border bg-gray-100 text-black placeholder-gray-400",
    outlined: "border bg-transparent text-black placeholder-gray-400",
  };

  const controlStyles = {
    base: "border rounded-lg bg-white hover:cursor-pointer",
    focus: "border-primary-600 ring-1 ring-primary-500",
    nonFocus: "border-gray-300 hover:border-gray-400",
  };
  const placeholderStyles = "text-gray-500 pl-1 py-0.5";
  const selectInputStyles = "pl-1 py-0.5";
  const valueContainerStyles = "p-1 gap-1";
  const singleValueStyles = "leading-7 ml-1";
  const multiValueStyles =
    "bg-gray-200 rounded items-center py-0.5 pl-2 pr-1 gap-1.5";
  const multiValueLabelStyles = "leading-6 py-0.5";
  const multiValueRemoveStyles =
    "border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md";
  const indicatorsContainerStyles = "p-1 gap-1";
  const clearIndicatorStyles =
    "text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800";
  const indicatorSeparatorStyles = "bg-gray-300";
  const dropdownIndicatorStyles =
    "p-1 hover:bg-gray-100 text-gray-500 rounded-md hover:text-black";
  const menuStyles = "p-1 border border-gray-200 bg-white rounded-lg";
  const groupHeadingStyles = "ml-3 mt-2 mb-1 text-gray-500 text-sm";
  const optionStyles = {
    base: "hover:cursor-pointer px-3 py-2 rounded",
    focus: "bg-gray-100 active:bg-gray-200",
    selected:
      "after:content-['✔'] after:ml-2 after:text-green-500 text-gray-500",
  };
  const noOptionsMessageStyles =
    "text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm";

  return (
    <>
      {label && (
        <label
          htmlFor={name}
          className="block text-lg font-normal text-gray-900"
        >
          {label}
        </label>
      )}
      <ReactSelect
        value={value}
        options={options}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        unstyled
        styles={{
          input: (base) => ({
            ...base,
            "input:focus": {
              boxShadow: "none",
            },
          }),
          // On mobile, the label will truncate automatically, so we want to
          // override that behaviour.
          multiValueLabel: (base) => ({
            ...base,
            whiteSpace: "normal",
            overflow: "visible",
          }),
          control: (base) => ({
            ...base,
            transition: "none",
          }),
          indicatorsContainer: (base) => ({
            ...base,
            marginTop: 0,
          }),
        }}
        classNames={{
          control: ({ isFocused }) =>
            cn(
              defaultClasses,
              variants[variant],
              className,
              errors && errors[name!] ? "border-red-500" : ""
            ),
          placeholder: () => placeholderStyles,
          input: () => selectInputStyles,
          valueContainer: () => valueContainerStyles,
          singleValue: () => singleValueStyles,
          multiValue: () => multiValueStyles,
          multiValueLabel: () => multiValueLabelStyles,
          multiValueRemove: () => multiValueRemoveStyles,
          indicatorsContainer: () => indicatorsContainerStyles,
          clearIndicator: () => clearIndicatorStyles,
          indicatorSeparator: () => indicatorSeparatorStyles,
          dropdownIndicator: () => dropdownIndicatorStyles,
          menu: () => menuStyles,
          groupHeading: () => groupHeadingStyles,
          option: ({ isFocused, isSelected }) =>
            clsx(
              isFocused && optionStyles.focus,
              isSelected && optionStyles.selected,
              optionStyles.base
            ),
          noOptionsMessage: () => noOptionsMessageStyles,
          container: () => "custom-no-margin",
        }}
        {...props}
      />
      {errors && name && (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <p className="custom-no-margin text-red-500">{message}</p>
          )}
        />
      )}
    </>
  );
};
