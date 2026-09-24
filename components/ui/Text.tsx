import { HTMLAttributes } from "react";

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  as?: "p" | "span" | "div";
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  variant?: "body" | "secondary";
}

export function Text({
  as: Tag = "p",
  size = "base",
  variant = "body",
  className = "",
  children,
  ...props
}: TextProps) {
  const sizeStyles = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const variantStyles = {
    body: "text-black",
    secondary: "text-gray-600",
  };

  return (
    <Tag
      className={`font-body ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
