/**
 * LazyLoadingDemo - Dimostra il lazy loading con Intersection Observer
 * 
 * LAZY LOADING: Carica le risorse solo quando diventano visibili.
 * Invece di caricare 100 immagini subito (bloccando tutto),
 * ne carichiamo solo quelle visibili nel viewport.
 */

import { useState, useEffect, useRef } from "react";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";

interface LazyImageProps {
  index: number;
  onVisible: () => void;
}

const LazyImage = ({ index, onVisible }: LazyImageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          onVisible();
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [onVisible]);

  useEffect(() => {
    if (isVisible) {
      // Simula il caricamento dell'immagine
      const delay = 300 + Math.random() * 700;
      const timer = setTimeout(() => setIsLoaded(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Colori diversi per ogni card
  const colors = [
    "from-primary/30 to-primary/10",
    "from-accent/30 to-accent/10",
    "from-success/30 to-success/10",
    "from-warning/30 to-warning/10",
  ];

  return (
    <div
      ref={ref}
      className="demo-card aspect-video flex items-center justify-center overflow-hidden"
    >
      {!isVisible ? (
        <div className="text-muted-foreground text-sm">In attesa...</div>
      ) : !isLoaded ? (
        <div className="w-full h-full skeleton-shimmer flex items-center justify-center">
          <LoadingIndicator variant="dots" />
        </div>
      ) : (
        <div 
          className={`w-full h-full bg-gradient-to-br ${colors[index % 4]} flex flex-col items-center justify-center gap-2 animate-blur-in`}
        >
          <span className="text-4xl">🖼️</span>
          <span className="text-sm font-medium">Immagine {index + 1}</span>
          <span className="text-xs text-success">✓ Caricata</span>
        </div>
      )}
    </div>
  );
};

export const LazyLoadingDemo = () => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [viewedCount, setViewedCount] = useState(0);
  const totalImages = 12;

  const handleVisible = () => {
    setViewedCount(c => c + 1);
    setTimeout(() => setLoadedCount(c => c + 1), 500);
  };

  const handleReset = () => {
    setLoadedCount(0);
    setViewedCount(0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Lazy Loading Demo</h3>
        <button 
          onClick={handleReset}
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Reset
        </button>
      </div>

      <p className="text-muted-foreground text-sm">
        Scorri verso il basso: le immagini si caricano solo quando diventano visibili!
      </p>

      {/* Stats bar */}
      <div className="demo-card flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-xs text-muted-foreground">Viste</p>
            <p className="text-xl font-bold text-accent">{viewedCount}/{totalImages}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Caricate</p>
            <p className="text-xl font-bold text-success">{loadedCount}/{totalImages}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Bandwidth risparmiata</p>
          <p className="text-xl font-bold text-primary">
            {Math.round(((totalImages - loadedCount) / totalImages) * 100)}%
          </p>
        </div>
      </div>

      {/* Scrollable image grid */}
      <div className="max-h-[400px] overflow-y-auto rounded-xl border border-border p-4 space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: totalImages }).map((_, i) => (
            <LazyImage key={i} index={i} onVisible={handleVisible} />
          ))}
        </div>
      </div>

      {/* Spiegazione */}
      <div className="p-4 rounded-lg bg-secondary/50 border border-border text-sm space-y-2">
        <h5 className="font-medium text-primary">💡 Come funziona?</h5>
        <p className="text-muted-foreground">
          L'Intersection Observer API rileva quando un elemento entra nel viewport.
          Carichiamo le risorse solo in quel momento, risparmiando bandwidth
          e velocizzando il caricamento iniziale della pagina.
        </p>
      </div>
    </div>
  );
};
