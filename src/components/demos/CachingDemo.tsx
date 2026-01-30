/**
 * CachingDemo - Mostra la potenza del caching
 * 
 * Simula chiamate a un "backend" con e senza cache,
 * evidenziando come il caching riduce drasticamente i tempi.
 */

import { useState } from "react";
import { useSimulatedCache } from "@/hooks/useSimulatedCache";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { Button } from "@/components/ui/button";

// Dati fittizi da "caricare"
const mockData = {
  user: { name: "Mario Rossi", email: "mario@example.com", role: "Developer" },
  products: ["Laptop", "Mouse", "Keyboard", "Monitor"],
  settings: { theme: "dark", language: "it", notifications: true },
};

type DataKey = keyof typeof mockData;

export const CachingDemo = () => {
  const { get, set, clear, stats } = useSimulatedCache<unknown>(30000);
  const [loading, setLoading] = useState<DataKey | null>(null);
  const [loadedData, setLoadedData] = useState<Record<string, unknown>>({});
  const [lastLoadTime, setLastLoadTime] = useState<number>(0);
  const [wasFromCache, setWasFromCache] = useState(false);

  const simulateLoad = async (key: DataKey) => {
    setLoading(key);
    const startTime = Date.now();

    // Controlla prima la cache
    const cached = get(key);
    
    if (cached) {
      // Cache HIT - Istantaneo!
      setLoadedData(prev => ({ ...prev, [key]: cached }));
      setLastLoadTime(Date.now() - startTime);
      setWasFromCache(true);
      setLoading(null);
      return;
    }

    // Cache MISS - Simula latenza del server (1.5-2.5s)
    const delay = 1500 + Math.random() * 1000;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Salva nella cache per le prossime richieste
    set(key, mockData[key]);
    setLoadedData(prev => ({ ...prev, [key]: mockData[key] }));
    setLastLoadTime(Date.now() - startTime);
    setWasFromCache(false);
    setLoading(null);
  };

  const handleClearCache = () => {
    clear();
    setLoadedData({});
    setLastLoadTime(0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <span>💾</span> Caching
        </h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleClearCache}
          className="text-xs"
        >
          Svuota Cache
        </Button>
      </div>

      {/* Beginner explanation */}
      <div className="p-4 rounded-lg bg-accent/10 border border-accent/20 space-y-3">
        <h4 className="font-medium text-accent flex items-center gap-2">
          <span>📚</span> Cos'è il Caching? (Spiegazione semplice)
        </h4>
        <p className="text-sm text-muted-foreground">
          Immagina di andare al supermercato ogni volta che vuoi bere acqua. 
          Stancante, vero? È più intelligente comprare una cassa e <strong>tenerla a casa</strong>.
        </p>
        <p className="text-sm text-muted-foreground">
          Il <strong className="text-accent">caching</strong> funziona così: la prima volta che chiedi dei dati, 
          il browser li "ricorda". Le volte successive, li prende dalla memoria invece di richiamare il server.
        </p>
      </div>

      {/* Try it yourself */}
      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm text-primary font-medium">
          👆 Prova tu: clicca un pulsante, poi clicca LO STESSO pulsante di nuovo. 
          Nota la differenza di velocità!
        </p>
      </div>

      {/* Data buttons */}
      <div className="grid grid-cols-3 gap-3">
        {(Object.keys(mockData) as DataKey[]).map((key) => (
          <button
            key={key}
            onClick={() => simulateLoad(key)}
            disabled={loading !== null}
            className="demo-card flex flex-col items-center gap-2 py-4 hover:border-primary/50 transition-colors disabled:opacity-50"
          >
            {loading === key ? (
              <LoadingIndicator size="md" />
            ) : loadedData[key] ? (
              <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center">
                <span className="text-success">✓</span>
              </div>
            ) : (
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">?</span>
              </div>
            )}
            <span className="text-sm font-medium capitalize">{key}</span>
            <span className="text-xs text-muted-foreground">
              {key === "user" && "👤 Profilo"}
              {key === "products" && "🛒 Prodotti"}
              {key === "settings" && "⚙️ Impostazioni"}
            </span>
          </button>
        ))}
      </div>

      {/* Stats with explanation */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="demo-card space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Statistiche Cache</h4>
          <div className="flex items-center gap-4">
            <div className="flex-1 text-center p-3 rounded-lg bg-success/10">
              <p className="text-3xl font-bold text-success">{stats.hits}</p>
              <p className="text-xs text-success/80">Cache Hit</p>
              <p className="text-xs text-muted-foreground">Dati dalla memoria</p>
            </div>
            <div className="flex-1 text-center p-3 rounded-lg bg-warning/10">
              <p className="text-3xl font-bold text-warning">{stats.misses}</p>
              <p className="text-xs text-warning/80">Cache Miss</p>
              <p className="text-xs text-muted-foreground">Dati dal server</p>
            </div>
          </div>
        </div>

        {lastLoadTime > 0 && (
          <div className={`demo-card space-y-2 ${wasFromCache ? 'border-success/30' : 'border-warning/30'}`}>
            <h4 className="text-sm font-medium text-muted-foreground">Ultimo caricamento</h4>
            <div className="flex items-baseline gap-2">
              <p className={`text-3xl font-bold ${wasFromCache ? 'text-success' : 'text-warning'}`}>
                {lastLoadTime}
              </p>
              <span className="text-muted-foreground">ms</span>
            </div>
            <div className={`inline-block text-xs px-2 py-1 rounded-full ${wasFromCache ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
              {wasFromCache ? '⚡ CACHE HIT - Istantaneo!' : '🐢 CACHE MISS - Dal server'}
            </div>
            <p className="text-xs text-muted-foreground">
              {wasFromCache 
                ? 'I dati erano già in memoria, nessuna attesa!'
                : 'Prima richiesta: abbiamo dovuto chiamare il server'}
            </p>
          </div>
        )}
      </div>

      {/* Real world examples */}
      <div className="p-4 rounded-lg bg-secondary/50 border border-border space-y-3">
        <h5 className="font-medium flex items-center gap-2">
          <span>🌍</span> Dove lo trovi nel mondo reale?
        </h5>
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div className="p-2 rounded bg-muted/50">
            <p className="font-medium">🖼️ Immagini</p>
            <p className="text-xs text-muted-foreground">Instagram, foto profilo</p>
          </div>
          <div className="p-2 rounded bg-muted/50">
            <p className="font-medium">📱 App offline</p>
            <p className="text-xs text-muted-foreground">Spotify scaricati, Gmail</p>
          </div>
          <div className="p-2 rounded bg-muted/50">
            <p className="font-medium">🌐 Siti web</p>
            <p className="text-xs text-muted-foreground">CSS, JS vengono cached</p>
          </div>
        </div>
      </div>
    </div>
  );
};
