/**
 * LoadingIndicator - Indicatori di caricamento animati
 * 
 * FEEDBACK IMMEDIATO
 * Questi indicatori mostrano all'utente che l'app sta lavorando.
 * Anche se l'operazione richiede tempo, l'utente non pensa
 * che l'app sia bloccata grazie al feedback visivo continuo.
 */

import { cn } from "@/lib/utils";

interface LoadingIndicatorProps {
  variant?: "spinner" | "dots" | "bar" | "pulse";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingIndicator = ({ 
  variant = "spinner", 
  size = "md",
  className 
}: LoadingIndicatorProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  if (variant === "spinner") {
    return (
      <div className={cn("relative", sizeClasses[size], className)}>
        <div className="absolute inset-0 rounded-full border-2 border-muted" />
        <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "rounded-full bg-primary",
              size === "sm" ? "h-1.5 w-1.5" : size === "md" ? "h-2 w-2" : "h-3 w-3",
              "animate-bounce"
            )}
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    );
  }

  if (variant === "bar") {
    return (
      <div className={cn("relative h-1 w-full overflow-hidden rounded-full bg-muted", className)}>
        <div className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-primary animate-loading-bar" />
      </div>
    );
  }

  // pulse variant
  return (
    <div className={cn(sizeClasses[size], "relative", className)}>
      <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-25" />
      <div className="absolute inset-2 rounded-full bg-primary" />
    </div>
  );
};
