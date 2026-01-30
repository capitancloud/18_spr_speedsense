/**
 * useSimulatedCache - Simula un sistema di caching
 * 
 * PERCHÉ IL CACHING?
 * Evita di ricaricare dati che abbiamo già.
 * Prima richiesta: 2 secondi (dal "server")
 * Seconda richiesta: istantanea (dalla cache)
 * 
 * NEL MONDO REALE:
 * - Browser cache (HTTP headers)
 * - Service Workers
 * - React Query / SWR
 * - Redis / Memcached lato server
 */

import { useState, useCallback, useRef } from "react";

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export function useSimulatedCache<T>(ttl: number = 30000) {
  const cache = useRef<Map<string, CacheEntry<T>>>(new Map());
  const [stats, setStats] = useState({ hits: 0, misses: 0 });

  const get = useCallback((key: string): T | null => {
    const entry = cache.current.get(key);
    
    if (!entry) {
      setStats(s => ({ ...s, misses: s.misses + 1 }));
      return null;
    }

    // Controlla se la cache è scaduta (TTL)
    if (Date.now() - entry.timestamp > ttl) {
      cache.current.delete(key);
      setStats(s => ({ ...s, misses: s.misses + 1 }));
      return null;
    }

    setStats(s => ({ ...s, hits: s.hits + 1 }));
    return entry.data;
  }, [ttl]);

  const set = useCallback((key: string, data: T) => {
    cache.current.set(key, {
      data,
      timestamp: Date.now(),
    });
  }, []);

  const clear = useCallback(() => {
    cache.current.clear();
    setStats({ hits: 0, misses: 0 });
  }, []);

  return { get, set, clear, stats };
}
