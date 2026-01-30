/**
 * PerformanceMetric - Visualizza metriche di performance
 * 
 * Mostra la differenza tra tempo reale e tempo percepito,
 * aiutando a capire come le tecniche di ottimizzazione
 * migliorano l'esperienza utente.
 */

import { cn } from "@/lib/utils";

interface PerformanceMetricProps {
  label: string;
  realTime: number;
  perceivedTime: number;
  unit?: string;
  className?: string;
}

export const PerformanceMetric = ({
  label,
  realTime,
  perceivedTime,
  unit = "ms",
  className,
}: PerformanceMetricProps) => {
  const improvement = Math.round(((realTime - perceivedTime) / realTime) * 100);
  const isImproved = improvement > 0;

  return (
    <div className={cn("demo-card", className)}>
      <h4 className="text-sm font-medium text-muted-foreground mb-3">{label}</h4>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Tempo Reale */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-warning" />
            <span className="text-xs text-muted-foreground">Tempo Reale</span>
          </div>
          <div className="text-2xl font-bold text-warning">
            {realTime}<span className="text-sm font-normal">{unit}</span>
          </div>
        </div>

        {/* Tempo Percepito */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Percepito</span>
          </div>
          <div className="text-2xl font-bold text-primary text-glow-primary">
            {perceivedTime}<span className="text-sm font-normal">{unit}</span>
          </div>
        </div>
      </div>

      {/* Improvement indicator */}
      {isImproved && (
        <div className="mt-4 flex items-center gap-2 text-success">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <span className="text-sm font-medium">{improvement}% più veloce percepito</span>
        </div>
      )}
    </div>
  );
};
