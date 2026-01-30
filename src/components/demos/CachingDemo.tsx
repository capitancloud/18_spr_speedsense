/**
 * CachingDemo - Mostra la potenza del caching
 * 
 * Simula chiamate a un "backend" con e senza cache,
 * evidenziando come il caching riduce drasticamente i tempi.
 */

import { useState } from "react";
import { useSimulatedCache } from "@/hooks/useSimulatedCache";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { PerformanceMetric } from "@/components/ui/PerformanceMetric";
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
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Caching Demo</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleClearCache}
          className="text-xs"
        >
          Svuota Cache
        </Button>
      </div>

      <p className="text-muted-foreground text-sm">
        Clicca per caricare i dati. La prima volta sarà lento, poi istantaneo dalla cache!
      </p>

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
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="demo-card">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Cache Hits</p>
              <p className="text-3xl font-bold text-success">{stats.hits}</p>
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Cache Misses</p>
              <p className="text-3xl font-bold text-warning">{stats.misses}</p>
            </div>
          </div>
        </div>

        {lastLoadTime > 0 && (
          <div className={`demo-card ${wasFromCache ? 'border-success/30' : 'border-warning/30'}`}>
            <p className="text-sm text-muted-foreground">Ultimo caricamento</p>
            <div className="flex items-baseline gap-2">
              <p className={`text-3xl font-bold ${wasFromCache ? 'text-success' : 'text-warning'}`}>
                {lastLoadTime}
              </p>
              <span className="text-muted-foreground">ms</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${wasFromCache ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
                {wasFromCache ? 'CACHE HIT' : 'CACHE MISS'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Loaded data preview */}
      {Object.keys(loadedData).length > 0 && (
        <div className="demo-card space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Dati Caricati:</h4>
          <pre className="text-xs text-primary/80 overflow-x-auto">
            {JSON.stringify(loadedData, null, 2)}
          </pre>
        </div>
      )}

      {/* Spiegazione */}
      <div className="p-4 rounded-lg bg-secondary/50 border border-border text-sm space-y-2">
        <h5 className="font-medium text-primary">💡 Come funziona?</h5>
        <p className="text-muted-foreground">
          La cache memorizza i dati già richiesti. Quando richiedi lo stesso dato,
          invece di aspettare il server, lo prendiamo dalla memoria locale.
          Nel mondo reale: React Query, SWR, browser cache, Service Workers.
        </p>
      </div>
    </div>
  );
};
