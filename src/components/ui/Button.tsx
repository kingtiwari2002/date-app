import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion, HTMLMotionProps } from "framer-motion";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline";
  size?: "default" | "sm" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", isLoading, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={!isLoading && !props.disabled ? { scale: 1.02 } : {}}
        whileTap={!isLoading && !props.disabled ? { scale: 0.98 } : {}}
        disabled={isLoading || props.disabled}
        className={cn(
          "inline-flex items-center justify-center rounded-2xl text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 relative",
          {
            "bg-[#D4AF37] text-black hover:bg-[#F3E5AB] shadow-[0_0_15px_rgba(212,175,55,0.3)]": variant === "primary",
            "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md": variant === "secondary",
            "border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10": variant === "outline",
            "h-12 px-8 py-3 text-base": size === "default",
            "h-9 px-4": size === "sm",
            "h-14 px-10 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="flex space-x-1.5 items-center">
            <motion.div className="w-1.5 h-1.5 bg-current rounded-full" animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 0.6 }} />
            <motion.div className="w-1.5 h-1.5 bg-current rounded-full" animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
            <motion.div className="w-1.5 h-1.5 bg-current rounded-full" animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
          </div>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
