import { HTMLAttributes } from "react";

export interface PriceProps extends HTMLAttributes<HTMLSpanElement> {
  amount: 1099 | 1299 | 1499;
  size?: "sm" | "md" | "lg";
}

export function Price({ amount, size = "md", className = "", ...props }: PriceProps) {
  const sizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <span
      className={`font-body font-medium ${sizeStyles[size]} ${className}`}
      {...props}
    >
      ₹{amount.toLocaleString("en-IN")}
    </span>
  );
}
