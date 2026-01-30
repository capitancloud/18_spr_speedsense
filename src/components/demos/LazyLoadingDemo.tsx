/**
 * LazyLoadingDemo - Dimostra il lazy loading con Intersection Observer
 * 
 * LAZY LOADING: Carica le risorse solo quando diventano visibili.
 * Invece di caricare 100 immagini subito (bloccando tutto),
 * ne carichiamo solo quelle visibili nel viewport.
 */

import { useState, useEffect, useRef, useCallback } from "react";
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
      const delay = 300 + Math.random() * 700;
      const timer = setTimeout(() => setIsLoaded(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const colors = [
    "from-primary/30 to-primary/10",
    "from-accent/30 to-accent/10",
    "from-success/30 to-success/10",
    "from-warning/30 to-warning/10",
  ];

  const emojis = ["🏔️", "🌅", "🌊", "🌸", "🏙️", "🌲", "🎨", "🚀", "🌙", "☀️", "🌈", "🦋"];

  return (
    <div
      ref={ref}
      className="demo-card aspect-video flex items-center justify-center overflow-hidden"
    >
      {!isVisible ? (
        <div className="text-center space-y-1">
          <div className="text-2xl opacity-30">📷</div>
          <div className="text-xs text-muted-foreground">In attesa...</div>
        </div>
      ) : !isLoaded ? (
        <div className="w-full h-full skeleton-shimmer flex items-center justify-center">
          <LoadingIndicator variant="dots" />
        </div>
      ) : (
        <div 
          className={`w-full h-full bg-gradient-to-br ${colors[index % 4]} flex flex-col items-center justify-center gap-2 animate-blur-in`}
        >
          <span className="text-4xl">{emojis[index % emojis.length]}</span>
          <span className="text-sm font-medium">Foto {index + 1}</span>
          <span className="text-xs text-success">✓ Caricata</span>
        </div>
      )}
    </div>
  );
};

export const LazyLoadingDemo = () => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [viewedCount, setViewedCount] = useState(0);
  const [key, setKey] = useState(0);
  const totalImages = 12;

  const handleVisible = useCallback(() => {
    setViewedCount(c => c + 1);
    setTimeout(() => setLoadedCount(c => c + 1), 500);
  }, []);

  const handleReset = () => {
    setLoadedCount(0);
    setViewedCount(0);
    setKey(k => k + 1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <span>⚡</span> Lazy Loading
        </h3>
        <button 
          onClick={handleReset}
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Beginner explanation */}
      <div className="p-4 rounded-lg bg-accent/10 border border-accent/20 space-y-3">
        <h4 className="font-medium text-accent flex items-center gap-2">
          <span>📚</span> Cos'è il Lazy Loading? (Spiegazione semplice)
        </h4>
        <p className="text-sm text-muted-foreground">
          Immagina Instagram con 1000 foto. Caricarle TUTTE appena apri l'app richiederebbe 
          minuti e consumerebbe tutta la tua connessione.
        </p>
        <p className="text-sm text-muted-foreground">
          Il <strong className="text-accent">lazy loading</strong> carica solo le foto che VEDI sullo schermo. 
          Scorri verso il basso? Solo allora carica le altre. Risparmio enorme!
        </p>
      </div>

      {/* Try it yourself */}
      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm text-primary font-medium">
          👆 Prova tu: scorri verso il basso nel riquadro. Guarda come le immagini 
          si caricano SOLO quando entrano nella tua visuale!
        </p>
      </div>

      {/* Stats bar */}
      <div className="demo-card">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Viste</p>
              <p className="text-xl font-bold text-accent">{viewedCount}/{totalImages}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Caricate</p>
              <p className="text-xl font-bold text-success">{loadedCount}/{totalImages}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Dati risparmiati</p>
            <p className="text-xl font-bold text-primary">
              {Math.round(((totalImages - loadedCount) / totalImages) * 100)}%
            </p>
            <p className="text-xs text-muted-foreground">
              ({totalImages - loadedCount} foto non scaricate)
            </p>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-success transition-all duration-300"
            style={{ width: `${(loadedCount / totalImages) * 100}%` }}
          />
        </div>
      </div>

      {/* Scrollable image grid */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-card to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card to-transparent z-10 pointer-events-none" />
        
        <div className="max-h-[350px] overflow-y-auto rounded-xl border border-border p-4" key={key}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: totalImages }).map((_, i) => (
              <LazyImage key={i} index={i} onVisible={handleVisible} />
            ))}
          </div>
        </div>
      </div>

      {/* Real world examples */}
      <div className="p-4 rounded-lg bg-secondary/50 border border-border space-y-3">
        <h5 className="font-medium flex items-center gap-2">
          <span>🌍</span> Dove lo trovi nel mondo reale?
        </h5>
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div className="p-2 rounded bg-muted/50">
            <p className="font-medium">📱 Social media</p>
            <p className="text-xs text-muted-foreground">Instagram, TikTok, Twitter</p>
          </div>
          <div className="p-2 rounded bg-muted/50">
            <p className="font-medium">🛒 E-commerce</p>
            <p className="text-xs text-muted-foreground">Amazon, eBay, Zalando</p>
          </div>
          <div className="p-2 rounded bg-muted/50">
            <p className="font-medium">📰 News</p>
            <p className="text-xs text-muted-foreground">Medium, articoli lunghi</p>
          </div>
        </div>
      </div>
    </div>
  );
};
