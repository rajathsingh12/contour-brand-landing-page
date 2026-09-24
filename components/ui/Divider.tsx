import { HTMLAttributes } from "react";

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
}

export function Divider({
  orientation = "horizontal",
  className = "",
  ...props
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <hr
        className={`border-l border-gray-200 h-full w-px ${className}`}
        {...props}
      />
    );
  }

  return (
    <hr
      className={`border-t border-gray-200 w-full ${className}`}
      {...props}
    />
  );
}
