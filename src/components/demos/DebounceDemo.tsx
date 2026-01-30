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
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Debounce Demo</h3>
        <button 
          onClick={handleReset}
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Reset
        </button>
      </div>

      <p className="text-muted-foreground text-sm">
        Digita in entrambi i campi e osserva quante "chiamate API" vengono fatte.
      </p>

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
            placeholder="Digita qui..."
            className="bg-muted border-warning/30 focus:border-warning"
          />

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Chiamate API:</span>
            <span className="text-2xl font-bold text-warning">{instantCalls}</span>
          </div>

          <div className="p-3 rounded-lg bg-warning/10 border border-warning/20 text-xs text-warning/80">
            ⚠️ Ogni carattere = 1 chiamata al server.
            Spreco di risorse e rischio di rate limiting!
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
            placeholder="Digita qui..."
            className="bg-muted border-primary/30 focus:border-primary"
          />

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Chiamate API:</span>
            <span className="text-2xl font-bold text-primary text-glow-primary">{debouncedCalls}</span>
          </div>

          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary/80">
            ✅ Aspetta 500ms dopo l'ultima digitazione.
            Stesso risultato, meno chiamate!
          </div>
        </div>
      </div>

      {/* Spiegazione tecnica */}
      <div className="p-4 rounded-lg bg-secondary/50 border border-border text-sm space-y-2">
        <h5 className="font-medium text-primary">💡 Come funziona?</h5>
        <p className="text-muted-foreground">
          Il debounce utilizza un timer che si resetta ad ogni input. 
          Solo quando l'utente smette di digitare per 500ms, la chiamata viene eseguita.
          Questo è essenziale per searchbar, autocomplete e form validation.
        </p>
      </div>
    </div>
  );
};
