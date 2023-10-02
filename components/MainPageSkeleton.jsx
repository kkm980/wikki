import React from "react";
import "tailwindcss/tailwind.css";
import { useTheme } from 'next-themes'
function SkeletonLoader({height = "h-4", width = "w-24", rounded='none' }) {
    const { resolvedTheme } = useTheme();
  return (
    <div className={`animate-pulse ${height} ${width} bg-${resolvedTheme==='dark'?'white':'black'} rounded-${rounded} mt-4`} />
  );
}

export default SkeletonLoader;

