import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  className?: string;
}

export function StatCard({ title, value, change, changeType = "neutral", icon: Icon, className }: StatCardProps) {
  return (
    <div className={cn(
      "bg-card rounded-xl border border-border p-6 relative overflow-hidden group hover:border-gold-warm/50 transition-all duration-300",
      className
    )}>
      {/* Okir background pattern */}
      <div className="absolute inset-0 okir-pattern opacity-50" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-muted-foreground text-sm font-medium">{title}</p>
            <h3 className="font-display text-3xl font-bold text-foreground mt-2">{value}</h3>
            {change && (
              <p className={cn(
                "text-sm mt-2 font-medium",
                changeType === "positive" && "text-forest-emerald",
                changeType === "negative" && "text-destructive",
                changeType === "neutral" && "text-muted-foreground"
              )}>
                {change}
              </p>
            )}
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-maroon flex items-center justify-center shadow-maroon group-hover:scale-110 transition-transform">
            <Icon className="w-5 h-5 text-gold-bright" />
          </div>
        </div>
      </div>
    </div>
  );
}
