"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none backdrop-blur-md",
  {
    variants: {
      variant: {
        default:
          "bg-primary/15 text-white border border-primary/40 hover:bg-primary/25 hover:border-primary/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_0_24px_rgba(0,102,255,0.25)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_0_32px_rgba(0,102,255,0.4)]",
        solid:
          "relative overflow-hidden bg-gradient-to-r from-primary to-blue-400 text-white border-0 shadow-[0_0_20px_rgba(0,102,255,0.5)] hover:shadow-[0_0_32px_rgba(0,102,255,0.75)] hover:brightness-110 active:brightness-95",
        outline:
          "bg-white/5 text-text-primary border border-white/10 hover:bg-white/10 hover:border-primary/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
        ghost:
          "text-text-secondary border border-transparent hover:text-text-primary hover:bg-white/8 hover:border-white/8",
        accent:
          "bg-accent/15 text-accent border border-accent/40 hover:bg-accent/25 hover:border-accent/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_0_24px_rgba(0,201,167,0.25)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_0_32px_rgba(0,201,167,0.4)]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
