"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

interface ProgressProps {
  value: number;
  className?: string;
  indicatorClassName?: string;
}

export function Progress({ value, className = "", indicatorClassName = "" }: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, value));
  
  return (
    <div className={`h-2 bg-solo-dark/50 rounded-full overflow-hidden ${className}`}>
      <div 
        className={`h-full bg-solo-purple transition-all duration-300 ${indicatorClassName}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
