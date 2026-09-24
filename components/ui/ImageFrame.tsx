"use client";

import Image from "next/image";
import { useState } from "react";

export interface ImageFrameProps {
  src: string;
  alt: string;
  aspectRatio?: "square" | "portrait" | "landscape";
  className?: string;
}

export function ImageFrame({
  src,
  alt,
  aspectRatio = "portrait",
  className = "",
}: ImageFrameProps) {
  const [hasError, setHasError] = useState(false);

  const aspectStyles = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
  };

  if (hasError || !src) {
    return (
      <div
        className={`
          ${aspectStyles[aspectRatio]}
          bg-gray-100
          flex items-center justify-center
          ${className}
        `}
      >
        <svg
          className="w-12 h-12 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative ${aspectStyles[aspectRatio]} overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  );
}
