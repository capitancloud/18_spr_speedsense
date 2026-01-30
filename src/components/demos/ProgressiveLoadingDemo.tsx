/**
 * ProgressiveLoadingDemo - Caricamento progressivo con skeleton e blur-up
 * 
 * Mostra come l'uso di skeleton, placeholder e transizioni
 * faccia sembrare un'app più veloce di quanto sia realmente.
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { PerformanceMetric } from "@/components/ui/PerformanceMetric";

type LoadingStage = "idle" | "skeleton" | "blur" | "loaded";

interface ContentItem {
  id: number;
  title: string;
  description: string;
  avatar: string;
}

const mockContent: ContentItem[] = [
  { id: 1, title: "Performance Optimization", description: "Impara a rendere le tue app veloci come un fulmine", avatar: "⚡" },
  { id: 2, title: "User Experience", description: "La percezione è realtà nel mondo delle web app", avatar: "🎯" },
  { id: 3, title: "Best Practices", description: "Tecniche usate da Google, Meta e altri giganti", avatar: "🏆" },
];

export const ProgressiveLoadingDemo = () => {
  const [stage, setStage] = useState<LoadingStage>("idle");
  const [showWithSkeleton, setShowWithSkeleton] = useState(true);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const simulateLoad = () => {
    setStartTime(Date.now());
    setStage("skeleton");

    // Stage 1: Skeleton per 1s
    setTimeout(() => {
      setStage("blur");
    }, 1000);

    // Stage 2: Blur-up per 0.5s
    setTimeout(() => {
      setStage("loaded");
      setElapsedTime(Date.now());
    }, 1500);
  };

  const reset = () => {
    setStage("idle");
    setElapsedTime(0);
  };

  const realLoadTime = elapsedTime > 0 ? elapsedTime - startTime : 0;
  // Performance percepita: lo skeleton dà feedback immediato
  const perceivedTime = Math.round(realLoadTime * 0.3);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Progressive Loading Demo</h3>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={showWithSkeleton}
              onChange={(e) => setShowWithSkeleton(e.target.checked)}
              className="rounded border-border"
            />
            Usa Skeleton
          </label>
        </div>
      </div>

      <p className="text-muted-foreground text-sm">
        Confronta il caricamento con e senza skeleton/blur-up. La percezione cambia drasticamente!
      </p>

      {/* Controls */}
      <div className="flex gap-3">
        <Button 
          onClick={simulateLoad} 
          disabled={stage !== "idle"}
          className="glow-primary"
        >
          {stage === "idle" ? "Carica Contenuto" : "Caricamento..."}
        </Button>
        {stage === "loaded" && (
          <Button variant="outline" onClick={reset}>
            Reset
          </Button>
        )}
      </div>

      {/* Content area */}
      <div className="min-h-[300px]">
        {stage === "idle" && (
          <div className="demo-card h-[300px] flex items-center justify-center text-muted-foreground">
            Premi "Carica Contenuto" per iniziare la demo
          </div>
        )}

        {stage === "skeleton" && showWithSkeleton && (
          <div className="space-y-4 animate-fade-up">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} className={`delay-${i * 100}`} />
            ))}
          </div>
        )}

        {stage === "skeleton" && !showWithSkeleton && (
          <div className="demo-card h-[300px] flex flex-col items-center justify-center gap-4">
            <LoadingIndicator size="lg" />
            <p className="text-muted-foreground">Caricamento in corso...</p>
          </div>
        )}

        {stage === "blur" && (
          <div className="space-y-4">
            {mockContent.map((item, i) => (
              <div
                key={item.id}
                className="demo-card flex items-center gap-4 blur-sm opacity-70 animate-pulse"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center text-2xl">
                  {item.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {stage === "loaded" && (
          <div className="space-y-4">
            {mockContent.map((item, i) => (
              <div
                key={item.id}
                className="demo-card flex items-center gap-4 animate-blur-in border-success/20"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center text-2xl glow-primary">
                  {item.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <span className="text-success">✓</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Metrics */}
      {stage === "loaded" && (
        <PerformanceMetric
          label="Confronto Performance"
          realTime={realLoadTime}
          perceivedTime={perceivedTime}
        />
      )}

      {/* Spiegazione */}
      <div className="p-4 rounded-lg bg-secondary/50 border border-border text-sm space-y-2">
        <h5 className="font-medium text-primary">💡 Come funziona?</h5>
        <p className="text-muted-foreground">
          Gli skeleton mostrano immediatamente la struttura del contenuto.
          Il blur-up fa apparire gradualmente i dettagli.
          L'utente percepisce l'app come più veloce perché riceve feedback visivo immediato,
          anche se il tempo di caricamento reale è lo stesso.
        </p>
      </div>
    </div>
  );
};
