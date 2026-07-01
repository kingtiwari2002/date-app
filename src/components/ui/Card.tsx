import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "./Button";

export interface CardProps extends HTMLMotionProps<"div"> {
  variant?: "glass" | "glass-gold";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "glass", ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-3xl p-6 transition-all duration-300",
          {
            "glass": variant === "glass",
            "glass-gold shadow-[0_0_30px_rgba(212,175,55,0.15)]": variant === "glass-gold",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";
