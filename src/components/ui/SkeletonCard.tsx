/**
 * SkeletonCard - Componente per il caricamento progressivo
 * 
 * PERCHÉ USARE GLI SKELETON?
 * Gli skeleton migliorano la performance percepita mostrando
 * immediatamente la struttura del contenuto. L'utente "vede"
 * che qualcosa sta caricando, riducendo la frustrazione.
 * 
 * Questa è una delle tecniche più efficaci per far sembrare
 * un'app veloce anche durante caricamenti lunghi.
 */

import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
  variant?: "default" | "image" | "list";
}

export const SkeletonCard = ({ className, variant = "default" }: SkeletonCardProps) => {
  if (variant === "image") {
    return (
      <div className={cn("demo-card space-y-4", className)}>
        <div className="aspect-video w-full rounded-lg skeleton-shimmer" />
        <div className="space-y-2">
          <div className="h-4 w-3/4 rounded skeleton-shimmer" />
          <div className="h-3 w-1/2 rounded skeleton-shimmer" />
        </div>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className={cn("demo-card space-y-3", className)}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full skeleton-shimmer" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-3/4 rounded skeleton-shimmer" />
              <div className="h-2 w-1/2 rounded skeleton-shimmer" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("demo-card space-y-4", className)}>
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-lg skeleton-shimmer" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-2/3 rounded skeleton-shimmer" />
          <div className="h-3 w-1/3 rounded skeleton-shimmer" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full rounded skeleton-shimmer" />
        <div className="h-3 w-5/6 rounded skeleton-shimmer" />
        <div className="h-3 w-4/6 rounded skeleton-shimmer" />
      </div>
    </div>
  );
};
