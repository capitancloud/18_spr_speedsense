/**
 * Hero Section - Introduce SpeedSense per principianti
 */

import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { LogoutButton } from "@/components/LogoutButton";

export const Hero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Logout button */}
      <div className="absolute top-4 right-4 z-20">
        <LogoutButton variant="outline" />
      </div>
      
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-accent/10 rounded-full blur-3xl animate-float" />
      
      {/* Content */}
      <div className="relative z-10 container px-4 text-center space-y-8">
        {/* Logo/Title */}
        <div className="space-y-6 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <LoadingIndicator variant="pulse" size="sm" />
            <span className="text-sm text-primary">Impara la Web Performance</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="text-glow-primary text-primary">Speed</span>
            <span className="text-foreground">Sense</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Scopri come i migliori sviluppatori fanno sembrare le app 
            <span className="text-primary"> velocissime</span>, anche quando non lo sono.
          </p>
        </div>

        {/* Beginner friendly badge */}
        <div className="animate-fade-up delay-200">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-success/10 border border-success/20">
            <span className="text-2xl">🎓</span>
            <div className="text-left">
              <p className="text-sm font-medium text-success">Per principianti</p>
              <p className="text-xs text-muted-foreground">Nessuna esperienza richiesta!</p>
            </div>
          </div>
        </div>

        {/* What you'll learn preview */}
        <div className="flex flex-wrap justify-center gap-3 animate-fade-up delay-300">
          {[
            { icon: "🎯", label: "Debounce", desc: "Meno lavoro inutile" },
            { icon: "💾", label: "Caching", desc: "Ricorda i dati" },
            { icon: "⚡", label: "Lazy Load", desc: "Carica solo il necessario" },
            { icon: "📊", label: "Progressive", desc: "Mostra subito qualcosa" },
          ].map((item) => (
            <div
              key={item.label}
              className="glass px-4 py-3 rounded-xl flex items-center gap-3 hover:border-primary/50 transition-all hover:scale-105"
            >
              <span className="text-2xl">{item.icon}</span>
              <div className="text-left">
                <span className="text-sm font-medium block">{item.label}</span>
                <span className="text-xs text-muted-foreground">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="animate-bounce pt-4">
          <p className="text-sm text-muted-foreground mb-2">Scorri per iniziare</p>
          <svg 
            className="w-6 h-6 mx-auto text-muted-foreground" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};
