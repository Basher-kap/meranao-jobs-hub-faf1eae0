import { cn } from "@/lib/utils";

interface OkirPatternProps {
  className?: string;
  variant?: "corner" | "border" | "divider";
}

export function OkirPattern({ className, variant = "divider" }: OkirPatternProps) {
  if (variant === "divider") {
    return (
      <div className={cn("flex items-center justify-center gap-4 py-4", className)}>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-warm/50 to-transparent" />
        <svg viewBox="0 0 60 30" className="w-16 h-8 text-gold-warm">
          <path
            d="M30 5 Q20 15 10 10 Q5 25 30 25 Q55 25 50 10 Q40 15 30 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="30" cy="15" r="3" fill="currentColor" />
        </svg>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-warm/50 to-transparent" />
      </div>
    );
  }

  if (variant === "corner") {
    return (
      <svg viewBox="0 0 80 80" className={cn("w-20 h-20 text-gold-warm/30", className)}>
        <path
          d="M10 70 Q10 10 70 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M20 70 Q20 20 70 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="15" cy="15" r="4" fill="currentColor" />
        <path
          d="M5 50 Q15 40 25 50 Q35 40 45 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    );
  }

  return (
    <div className={cn("h-1 w-full bg-gradient-gold", className)} />
  );
}
