import { HTMLAttributes } from "react";
import type { Price as PriceValue } from "@/data/dresses";

export interface PriceProps extends HTMLAttributes<HTMLSpanElement> {
  amount: PriceValue;
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
