/**
 * IntroSection - Spiega cos'è la web performance ai principianti
 */

import { useState } from "react";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";

export const IntroSection = () => {
  const [showSlow, setShowSlow] = useState(false);
  const [showFast, setShowFast] = useState(false);

  const simulateSlow = () => {
    setShowSlow(true);
    setShowFast(false);
  };

  const simulateFast = () => {
    setShowFast(true);
    setShowSlow(false);
  };

  return (
    <section className="py-16 border-b border-border">
      <div className="container px-4 space-y-12">
        {/* Main intro */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent text-sm">
            📚 Per chi parte da zero
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold">
            Cos'è la <span className="text-primary">Web Performance</span>?
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            Quando apri un sito web, il tuo browser deve scaricare file, elaborare dati 
            e mostrare contenuti. Tutto questo richiede <strong className="text-foreground">tempo</strong>. 
            La web performance è l'arte di far sembrare questo processo <strong className="text-primary">il più veloce possibile</strong>.
          </p>
        </div>

        {/* Visual comparison */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-center mb-6">
            🎯 La differenza che fa la differenza
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Bad example */}
            <div className="demo-card space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-warning">❌ Senza ottimizzazione</h4>
                <button 
                  onClick={simulateSlow}
                  className="text-xs px-3 py-1 rounded bg-warning/20 text-warning hover:bg-warning/30 transition-colors"
                >
                  Simula
                </button>
              </div>
              
              <div className="h-32 rounded-lg bg-muted/50 flex items-center justify-center border border-warning/20">
                {showSlow ? (
                  <div className="text-center space-y-2 animate-fade-up">
                    <LoadingIndicator size="lg" />
                    <p className="text-sm text-muted-foreground">Schermo bianco per 3 secondi...</p>
                    <p className="text-xs text-warning">L'utente non sa cosa sta succedendo!</p>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">Clicca "Simula" per vedere</p>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground">
                L'utente vede uno <strong>schermo vuoto</strong> mentre tutto carica. 
                Non sa se l'app funziona o è bloccata.
              </p>
            </div>

            {/* Good example */}
            <div className="demo-card space-y-4 border-primary/30">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-primary">✓ Con ottimizzazione</h4>
                <button 
                  onClick={simulateFast}
                  className="text-xs px-3 py-1 rounded bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
                >
                  Simula
                </button>
              </div>
              
              <div className="h-32 rounded-lg bg-muted/50 flex items-center justify-center border border-primary/20">
                {showFast ? (
                  <div className="w-full p-4 space-y-2 animate-fade-up">
                    <div className="h-4 w-3/4 rounded skeleton-shimmer" />
                    <div className="h-3 w-1/2 rounded skeleton-shimmer" />
                    <div className="h-3 w-2/3 rounded skeleton-shimmer" />
                    <p className="text-xs text-primary mt-2">L'utente vede che qualcosa sta caricando!</p>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">Clicca "Simula" per vedere</p>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground">
                L'utente vede <strong className="text-primary">feedback immediato</strong>: 
                skeleton, animazioni, progressi. Sa che l'app sta lavorando.
              </p>
            </div>
          </div>
        </div>

        {/* Key insight */}
        <div className="max-w-2xl mx-auto">
          <div className="demo-card bg-primary/5 border-primary/30 text-center space-y-4">
            <div className="text-4xl">💡</div>
            <h3 className="text-xl font-semibold">Il segreto della performance</h3>
            <p className="text-muted-foreground">
              Non si tratta sempre di essere <em>realmente</em> più veloci. 
              Si tratta di <strong className="text-primary">sembrare</strong> più veloci.
              Un'app che mostra subito qualcosa sembra più veloce di una che aspetta in silenzio, 
              anche se impiegano lo stesso tempo!
            </p>
          </div>
        </div>

        {/* What you'll learn */}
        <div className="max-w-3xl mx-auto space-y-6">
          <h3 className="text-xl font-semibold text-center">📖 Cosa imparerai oggi</h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: "🎯",
                title: "Debounce",
                desc: "Evitare di fare troppo lavoro mentre l'utente digita",
              },
              {
                icon: "💾",
                title: "Caching",
                desc: "Ricordare i dati già scaricati per non riscaricarli",
              },
              {
                icon: "⚡",
                title: "Lazy Loading",
                desc: "Caricare le cose solo quando servono davvero",
              },
              {
                icon: "📊",
                title: "Progressive Loading",
                desc: "Mostrare qualcosa subito, poi completare i dettagli",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 p-4 rounded-lg bg-secondary/30">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
