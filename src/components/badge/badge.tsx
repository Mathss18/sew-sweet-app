import { ComponentProps } from "react";
import { cn } from "@/helpers";

export type BadgeProps = {
  props?: any;
  variant?: keyof typeof variants;
  color?: "red" | "blue" | "gray";
  title: string;
} & ComponentProps<"li">;

const defaultClasses =
  "inline-flex items-center justify-center px-2 ml-3 text-sm font-medium";

const variants = {
  filled: {
    red: "border border-red-800 text-red-800 bg-red-100 rounded-full",
    blue: "border border-blue-800 text-blue-800 bg-blue-100 rounded-full",
    gray: "border border-gray-800 text-gray-800 bg-gray-100 rounded-full",
  },
  outlined: {
    red: "border border-red-400 text-red-400 bg-transparent rounded-full",
    blue: "border border-blue-400 text-blue-400 bg-transparent rounded-full",
    gray: "border border-gray-400 text-gray-400 bg-transparent rounded-full",
  },
  tinted: {
    red: "border border-red-200 bg-red-200 text-red-500 rounded-full",
    blue: "border border-blue-200 bg-blue-200 text-blue-500 rounded-full",
    gray: "border border-gray-200 bg-gray-200 text-gray-500 rounded-full",
  },
  plain: {
    red: "border border-transparent bg-transparent text-red-400 rounded-full",
    blue: "border border-transparent bg-transparent text-blue-400 rounded-full",
    gray: "border border-transparent bg-transparent text-gray-400 rounded-full",
  },
};

export const Badge = ({
  title,
  variant = "filled",
  color = "gray",
  className,
  ...props
}: BadgeProps): JSX.Element => {
  return (
    <span
      className={cn(defaultClasses, variants[variant][color], className)}
      {...props}
    >
      {title}
    </span>
  );
};
