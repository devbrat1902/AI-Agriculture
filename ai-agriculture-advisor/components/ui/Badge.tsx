"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-neutral-900 text-neutral-50",
        secondary:
          "border-transparent bg-neutral-200 text-neutral-900",
        success:
          "border-transparent bg-success text-white",
        warning:
          "border-transparent bg-warning text-white",
        error:
          "border-transparent bg-error text-white",
        info:
          "border-transparent bg-info text-white",
        outline: "text-neutral-700 border-neutral-300",
        // Severity badges for disease detection
        low:
          "border-transparent bg-success-light text-success-dark",
        medium:
          "border-transparent bg-warning-light text-warning-dark",
        high:
          "border-transparent bg-error-light text-error-dark",
        critical:
          "border-transparent bg-error-dark text-white",
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-2.5 py-0.5",
        lg: "text-base px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
