import { HTMLAttributes } from "react";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
}

export function Heading({
  as: Tag = "h2",
  size = "xl",
  className = "",
  children,
  ...props
}: HeadingProps) {
  const sizeStyles = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
    "2xl": "text-5xl",
    "3xl": "text-6xl",
  };

  return (
    <Tag
      className={`font-display font-normal ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
