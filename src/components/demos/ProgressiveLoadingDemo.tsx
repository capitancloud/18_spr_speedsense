/**
 * ProgressiveLoadingDemo - Caricamento progressivo con skeleton e blur-up
 * 
 * Mostra come l'uso di skeleton, placeholder e transizioni
 * faccia sembrare un'app più veloce di quanto sia realmente.
 */

import { useState } from "react";
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

    setTimeout(() => {
      setStage("blur");
    }, 1000);

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
  const perceivedTime = Math.round(realLoadTime * 0.3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <span>📊</span> Progressive Loading
        </h3>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={showWithSkeleton}
            onChange={(e) => setShowWithSkeleton(e.target.checked)}
            className="rounded border-border accent-primary"
          />
          Usa Skeleton
        </label>
      </div>

      {/* Beginner explanation */}
      <div className="p-4 rounded-lg bg-accent/10 border border-accent/20 space-y-3">
        <h4 className="font-medium text-accent flex items-center gap-2">
          <span>📚</span> Cos'è il Progressive Loading? (Spiegazione semplice)
        </h4>
        <p className="text-sm text-muted-foreground">
          Quando ordini una pizza, preferisci che il cameriere ti dica "arriva tra 15 minuti" 
          o che sparisca senza dire nulla? La prima opzione ti fa sentire meno in attesa!
        </p>
        <p className="text-sm text-muted-foreground">
          Il <strong className="text-accent">progressive loading</strong> mostra SUBITO la struttura 
          della pagina (skeleton), poi i contenuti sfocati, poi quelli nitidi. 
          L'utente percepisce l'app come più veloce perché vede sempre qualcosa.
        </p>
      </div>

      {/* Stages explanation */}
      <div className="flex items-center justify-center gap-2 text-xs flex-wrap">
        <div className={`px-3 py-1 rounded-full ${stage === "idle" ? "bg-muted text-foreground" : "bg-muted/50 text-muted-foreground"}`}>
          1️⃣ Inizio
        </div>
        <span className="text-muted-foreground">→</span>
        <div className={`px-3 py-1 rounded-full ${stage === "skeleton" ? "bg-accent/20 text-accent" : "bg-muted/50 text-muted-foreground"}`}>
          2️⃣ Skeleton
        </div>
        <span className="text-muted-foreground">→</span>
        <div className={`px-3 py-1 rounded-full ${stage === "blur" ? "bg-primary/20 text-primary" : "bg-muted/50 text-muted-foreground"}`}>
          3️⃣ Blur
        </div>
        <span className="text-muted-foreground">→</span>
        <div className={`px-3 py-1 rounded-full ${stage === "loaded" ? "bg-success/20 text-success" : "bg-muted/50 text-muted-foreground"}`}>
          4️⃣ Completo
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        <Button 
          onClick={simulateLoad} 
          disabled={stage !== "idle"}
          className="glow-primary"
        >
          {stage === "idle" ? "▶️ Carica Contenuto" : "Caricamento..."}
        </Button>
        {stage === "loaded" && (
          <Button variant="outline" onClick={reset}>
            🔄 Reset
          </Button>
        )}
      </div>

      {/* Content area */}
      <div className="min-h-[280px]">
        {stage === "idle" && (
          <div className="demo-card h-[280px] flex flex-col items-center justify-center text-muted-foreground gap-3">
            <div className="text-4xl">👆</div>
            <p>Premi "Carica Contenuto" per vedere la magia!</p>
            <p className="text-xs">Suggerimento: prova anche a disabilitare "Usa Skeleton"</p>
          </div>
        )}

        {stage === "skeleton" && showWithSkeleton && (
          <div className="space-y-4 animate-fade-up">
            <p className="text-xs text-accent text-center">
              ⏳ Lo skeleton mostra la STRUTTURA mentre i dati caricano...
            </p>
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {stage === "skeleton" && !showWithSkeleton && (
          <div className="demo-card h-[280px] flex flex-col items-center justify-center gap-4">
            <LoadingIndicator size="lg" />
            <p className="text-muted-foreground">Caricamento in corso...</p>
            <p className="text-xs text-warning">😬 L'utente non sa cosa aspettarsi...</p>
          </div>
        )}

        {stage === "blur" && (
          <div className="space-y-4">
            <p className="text-xs text-primary text-center">
              ✨ I contenuti appaiono sfocati, poi si schiariscono...
            </p>
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
            <p className="text-xs text-success text-center">
              ✅ Contenuto caricato! L'attesa è sembrata più breve, vero?
            </p>
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
        <div className="space-y-3">
          <PerformanceMetric
            label="Confronto Performance"
            realTime={realLoadTime}
            perceivedTime={perceivedTime}
          />
          <p className="text-xs text-center text-muted-foreground">
            Il tempo reale è lo stesso, ma la percezione cambia completamente!
          </p>
        </div>
      )}

      {/* Real world examples */}
      <div className="p-4 rounded-lg bg-secondary/50 border border-border space-y-3">
        <h5 className="font-medium flex items-center gap-2">
          <span>🌍</span> Dove lo trovi nel mondo reale?
        </h5>
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div className="p-2 rounded bg-muted/50">
            <p className="font-medium">📘 Facebook</p>
            <p className="text-xs text-muted-foreground">Skeleton nel feed</p>
          </div>
          <div className="p-2 rounded bg-muted/50">
            <p className="font-medium">💼 LinkedIn</p>
            <p className="text-xs text-muted-foreground">Skeleton nei profili</p>
          </div>
          <div className="p-2 rounded bg-muted/50">
            <p className="font-medium">🎵 Spotify</p>
            <p className="text-xs text-muted-foreground">Blur-up delle copertine</p>
          </div>
        </div>
      </div>
    </div>
  );
};
