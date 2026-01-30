/**
 * DemoSection - Container per le demo interattive
 */

import { useState } from "react";
import { DebounceDemo } from "@/components/demos/DebounceDemo";
import { CachingDemo } from "@/components/demos/CachingDemo";
import { LazyLoadingDemo } from "@/components/demos/LazyLoadingDemo";
import { ProgressiveLoadingDemo } from "@/components/demos/ProgressiveLoadingDemo";
import { cn } from "@/lib/utils";

const demos = [
  { id: "debounce", label: "Debounce", icon: "🎯", component: DebounceDemo },
  { id: "caching", label: "Caching", icon: "💾", component: CachingDemo },
  { id: "lazy", label: "Lazy Loading", icon: "⚡", component: LazyLoadingDemo },
  { id: "progressive", label: "Progressive", icon: "📊", component: ProgressiveLoadingDemo },
];

export const DemoSection = () => {
  const [activeDemo, setActiveDemo] = useState("debounce");
  const ActiveComponent = demos.find(d => d.id === activeDemo)?.component || DebounceDemo;

  return (
    <section className="py-16">
      <div className="container px-4 space-y-8">
        {/* Section header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Demo <span className="text-primary">Interattive</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Sperimenta in prima persona le tecniche di ottimizzazione.
            Ogni demo mostra la differenza tra l'approccio naive e quello ottimizzato.
          </p>
        </div>

        {/* Demo tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {demos.map((demo) => (
            <button
              key={demo.id}
              onClick={() => setActiveDemo(demo.id)}
              className={cn(
                "px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300",
                activeDemo === demo.id
                  ? "bg-primary text-primary-foreground glow-primary"
                  : "bg-secondary/50 text-secondary-foreground hover:bg-secondary"
              )}
            >
              <span>{demo.icon}</span>
              <span className="font-medium">{demo.label}</span>
            </button>
          ))}
        </div>

        {/* Demo content */}
        <div className="max-w-4xl mx-auto">
          <div className="demo-card animate-scale-up" key={activeDemo}>
            <ActiveComponent />
          </div>
        </div>
      </div>
    </section>
  );
};
