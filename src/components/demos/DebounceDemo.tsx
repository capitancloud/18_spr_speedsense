/**
 * DebounceDemo - Confronto visivo tra input con e senza debounce
 * 
 * Questo demo mostra come il debounce riduce le chiamate "API"
 * mantenendo la stessa esperienza utente finale.
 */

import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { Input } from "@/components/ui/input";

export const DebounceDemo = () => {
  // Senza debounce
  const [instantValue, setInstantValue] = useState("");
  const [instantCalls, setInstantCalls] = useState(0);
  const [instantLoading, setInstantLoading] = useState(false);

  // Con debounce
  const [debouncedInput, setDebouncedInput] = useState("");
  const debouncedValue = useDebounce(debouncedInput, 500);
  const [debouncedCalls, setDebouncedCalls] = useState(0);
  const [debouncedLoading, setDebouncedLoading] = useState(false);

  // Simula chiamata API istantanea (senza debounce)
  useEffect(() => {
    if (instantValue) {
      setInstantCalls(c => c + 1);
      setInstantLoading(true);
      const timer = setTimeout(() => setInstantLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [instantValue]);

  // Simula chiamata API con debounce
  useEffect(() => {
    if (debouncedValue) {
      setDebouncedCalls(c => c + 1);
      setDebouncedLoading(true);
      const timer = setTimeout(() => setDebouncedLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [debouncedValue]);

  const handleReset = () => {
    setInstantValue("");
    setDebouncedInput("");
    setInstantCalls(0);
    setDebouncedCalls(0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <span>🎯</span> Debounce
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
          <span>📚</span> Cos'è il Debounce? (Spiegazione semplice)
        </h4>
        <p className="text-sm text-muted-foreground">
          Immagina di cercare "pizza" su Google. Se il browser cercasse ad ogni lettera digitata, 
          farebbe <strong>5 ricerche</strong>: "p", "pi", "piz", "pizz", "pizza". 
          Spreco di risorse!
        </p>
        <p className="text-sm text-muted-foreground">
          Il <strong className="text-accent">debounce</strong> aspetta che tu smetta di digitare 
          per un attimo, poi fa <strong>una sola ricerca</strong> con la parola completa.
        </p>
      </div>

      {/* Try it yourself */}
      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm text-primary font-medium">
          👆 Prova tu: digita "ciao" in entrambi i campi e osserva quante "chiamate" vengono fatte!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Senza Debounce */}
        <div className="demo-card space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-warning">❌ Senza Debounce</h4>
            {instantLoading && <LoadingIndicator size="sm" />}
          </div>
          
          <Input
            value={instantValue}
            onChange={(e) => setInstantValue(e.target.value)}
            placeholder='Scrivi "ciao" qui...'
            className="bg-muted border-warning/30 focus:border-warning"
          />

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Chiamate al server:</span>
            <span className="text-2xl font-bold text-warning">{instantCalls}</span>
          </div>

          <div className="p-3 rounded-lg bg-warning/10 border border-warning/20 text-xs space-y-1">
            <p className="text-warning font-medium">⚠️ Problema:</p>
            <p className="text-warning/80">
              Ogni lettera = 1 richiesta al server. 
              Se hai 1000 utenti che digitano, il server esplode! 💥
            </p>
          </div>
        </div>

        {/* Con Debounce */}
        <div className="demo-card space-y-4 border-primary/30">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-primary">✓ Con Debounce (500ms)</h4>
            {debouncedLoading && <LoadingIndicator size="sm" />}
          </div>
          
          <Input
            value={debouncedInput}
            onChange={(e) => setDebouncedInput(e.target.value)}
            placeholder='Scrivi "ciao" qui...'
            className="bg-muted border-primary/30 focus:border-primary"
          />

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Chiamate al server:</span>
            <span className="text-2xl font-bold text-primary text-glow-primary">{debouncedCalls}</span>
          </div>

          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-xs space-y-1">
            <p className="text-primary font-medium">✅ Soluzione:</p>
            <p className="text-primary/80">
              Aspetta 500ms dopo l'ultima lettera, poi fa UNA sola richiesta.
              Stesso risultato, 80% meno lavoro!
            </p>
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
            <p className="font-medium">🔍 Barra di ricerca</p>
            <p className="text-xs text-muted-foreground">Google, Amazon, YouTube</p>
          </div>
          <div className="p-2 rounded bg-muted/50">
            <p className="font-medium">📝 Form di validazione</p>
            <p className="text-xs text-muted-foreground">Controllo email, username</p>
          </div>
          <div className="p-2 rounded bg-muted/50">
            <p className="font-medium">🗺️ Mappe</p>
            <p className="text-xs text-muted-foreground">Zoom e pan su Google Maps</p>
          </div>
        </div>
      </div>
    </div>
  );
};
