import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-gold",
        ghost: "hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Okir-inspired variants
        gold: "bg-gradient-to-r from-gold-warm via-gold-bright to-gold-warm text-maroon-deep font-semibold shadow-gold hover:shadow-lg hover:scale-[1.02] transition-transform",
        maroon: "bg-gradient-maroon text-gold-bright border border-gold-warm/30 hover:border-gold-warm shadow-maroon",
        hero: "bg-gradient-to-r from-gold-warm via-gold-bright to-gold-warm text-maroon-deep font-display font-semibold text-base px-8 py-6 shadow-gold hover:shadow-lg hover:scale-[1.02] transition-transform uppercase tracking-wider",
        "hero-outline": "border-2 border-gold-bright bg-transparent text-gold-bright font-display font-semibold text-base px-8 py-6 hover:bg-gold-bright/10 uppercase tracking-wider",
        forest: "bg-forest text-accent-foreground hover:bg-forest-emerald shadow-md",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-lg px-8",
        xl: "h-14 rounded-xl px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
