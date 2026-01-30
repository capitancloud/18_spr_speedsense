/**
 * SpeedSense - Main Page
 * 
 * App educativa sulla web performance che mostra la differenza
 * tra performance reale e percepita attraverso demo interattive.
 */

import { Hero } from "@/components/Hero";
import { DemoSection } from "@/components/DemoSection";
import { ConceptsSection } from "@/components/ConceptsSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <DemoSection />
      <ConceptsSection />
      <Footer />
    </div>
  );
};

export default Index;
