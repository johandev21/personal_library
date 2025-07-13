import { Star } from "lucide-react";
import React from "react";

interface StarRatingProps {
  rating: number | null;
  className?: string;
}

export const StarRating = React.memo(({ rating, className }: StarRatingProps) => {
  if (rating === null) {
    return null;
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
});

StarRating.displayName = "StarRating";