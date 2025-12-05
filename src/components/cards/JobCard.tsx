import { useState } from "react";
import { MapPin, Clock, DollarSign, Building, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Part-Time" | "Flexible" | "Weekend";
  salary: string;
  posted: string;
  description: string;
  tags: string[];
  urgent?: boolean;
}

interface JobCardProps {
  job: Job;
  className?: string;
  style?: React.CSSProperties;
}

export function JobCard({ job, className, style }: JobCardProps) {
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleApply = () => {
    toast({
      title: "Application Submitted!",
      description: `You applied for ${job.title} at ${job.company}`,
    });
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from saved" : "Job saved!",
      description: isBookmarked ? "Job removed from your saved list" : "Job added to your saved list",
    });
  };

  return (
    <div
      className={cn(
        "group bg-card rounded-xl border border-border hover:border-gold-warm/50 p-6 transition-all duration-300 hover:shadow-card relative overflow-hidden",
        className
      )}
      style={style}
    >
      {/* Okir-inspired corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
        <svg viewBox="0 0 80 80" className="w-full h-full text-gold-warm">
          <path d="M80 0 Q40 40 80 80" fill="currentColor" />
        </svg>
      </div>

      {job.urgent && (
        <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground text-xs font-semibold px-2 py-1 rounded">
          Urgent
        </div>
      )}

      <div className="flex items-start gap-4">
        {/* Company Icon */}
        <div className="w-14 h-14 rounded-xl bg-gradient-maroon flex items-center justify-center shrink-0 shadow-maroon">
          <Building className="w-6 h-6 text-gold-bright" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {job.title}
          </h3>
          <p className="text-muted-foreground text-sm mt-1">{job.company}</p>

          <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gold-warm" />
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gold-warm" />
              {job.type}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-forest-emerald" />
              {job.salary}
            </span>
          </div>
        </div>
      </div>

      <p className="text-muted-foreground text-sm mt-4 line-clamp-2">
        {job.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <span className="text-xs text-muted-foreground">{job.posted}</span>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("h-9 w-9", isBookmarked && "text-gold-warm")}
            onClick={handleBookmark}
          >
            <Bookmark className={cn("w-4 h-4", isBookmarked && "fill-current")} />
          </Button>
          <Button variant="gold" size="sm" onClick={handleApply}>
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
}
