/**
 * useDebounce - Hook per il debouncing
 * 
 * PERCHÉ IL DEBOUNCE?
 * Evita di eseguire operazioni costose ad ogni keystroke.
 * Invece di fare 10 chiamate API mentre l'utente digita "ciao",
 * ne facciamo solo 1 quando ha finito di scrivere.
 * 
 * COME FUNZIONA:
 * Aspetta che l'utente smetta di digitare per X millisecondi
 * prima di eseguire l'azione. Ogni nuovo input resetta il timer.
 */

import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Imposta un timer che aggiornerà il valore dopo 'delay' ms
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: cancella il timer se il valore cambia prima che scada
    // Questo è il cuore del debounce!
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
