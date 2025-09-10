import React from "react";
import clsx from "clsx";

const baseStyles =
  "inline-flex items-center justify-center font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

const variants = {
  primary:
    "bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-500 disabled:bg-gray-400 disabled:text-gray-600 disabled:hover:bg-gray-400",
  secondary:
    "bg-gray-700 text-white-800 hover:bg-gray-500 focus:ring-gray-400 border border-gray-500 disabled:bg-gray-500 disabled:text-gray-400 disabled:hover:bg-gray-500",
  success:
    "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 disabled:bg-gray-400 disabled:text-gray-600 disabled:hover:bg-gray-400",
  danger:
    "bg-red-800 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-gray-400 disabled:text-gray-600 disabled:hover:bg-gray-400",
  link: "bg-transparent text-blue-700 underline hover:text-blue-900 focus:ring-blue-500 px-0 py-0 disabled:text-gray-400 disabled:hover:text-gray-400",
  light:
    "bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 focus:ring-gray-200 disabled:bg-gray-200 disabled:text-gray-500 disabled:hover:bg-gray-200",
  dark: "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-700 disabled:bg-gray-600 disabled:text-gray-400 disabled:hover:bg-gray-600",
  warning:
    "bg-yellow-400 text-gray-900 hover:bg-yellow-500 focus:ring-yellow-300 disabled:bg-gray-400 disabled:text-gray-600 disabled:hover:bg-gray-400",
  info: "bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500 disabled:bg-gray-400 disabled:text-gray-600 disabled:hover:bg-gray-400"
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg"
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
