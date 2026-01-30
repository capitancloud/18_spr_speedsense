/**
 * Hero Section - Introduce SpeedSense
 */

import { LoadingIndicator } from "@/components/ui/LoadingIndicator";

export const Hero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-accent/10 rounded-full blur-3xl animate-float" />
      
      {/* Content */}
      <div className="relative z-10 container px-4 text-center space-y-8">
        {/* Logo/Title */}
        <div className="space-y-4 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <LoadingIndicator variant="pulse" size="sm" />
            <span className="text-sm text-primary">Performance Education</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="text-glow-primary text-primary">Speed</span>
            <span className="text-foreground">Sense</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Impara a creare app che <span className="text-primary">sembrano veloci</span>, 
            anche quando lavorano dietro le quinte.
          </p>
        </div>

        {/* Key concepts */}
        <div className="flex flex-wrap justify-center gap-4 animate-fade-up delay-200">
          {[
            { icon: "⚡", label: "Lazy Loading" },
            { icon: "🎯", label: "Debounce" },
            { icon: "💾", label: "Caching" },
            { icon: "📊", label: "Progressive Loading" },
          ].map((item) => (
            <div
              key={item.label}
              className="glass px-4 py-2 rounded-lg flex items-center gap-2 hover:border-primary/50 transition-colors"
            >
              <span>{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="animate-bounce pt-8">
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
