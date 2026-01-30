/**
 * ConceptsSection - Spiega i concetti chiave
 */

const concepts = [
  {
    title: "Performance Reale vs Percepita",
    icon: "🧠",
    description: "La performance che conta è quella che l'utente percepisce. Un'app può impiegare 3 secondi a caricare i dati, ma sembrare istantanea grazie a feedback immediato e transizioni fluide.",
    color: "primary",
  },
  {
    title: "First Contentful Paint",
    icon: "🎨",
    description: "Mostra qualcosa all'utente il prima possibile. Skeleton screens, placeholder e caricamento progressivo riducono il tempo percepito di attesa.",
    color: "accent",
  },
  {
    title: "Optimistic Updates",
    icon: "✨",
    description: "Aggiorna l'UI immediatamente, poi sincronizza col server. Se l'operazione fallisce, ripristina lo stato precedente. L'utente non nota la latenza.",
    color: "success",
  },
  {
    title: "Resource Prioritization",
    icon: "📋",
    description: "Carica prima ciò che l'utente vede. Lazy loading, code splitting e prefetching permettono di ottimizzare l'ordine di caricamento delle risorse.",
    color: "warning",
  },
];

export const ConceptsSection = () => {
  return (
    <section className="py-16 bg-secondary/20">
      <div className="container px-4 space-y-12">
        {/* Section header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Concetti <span className="text-primary">Fondamentali</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Le tecniche usate dai migliori team di sviluppo per creare esperienze utente impeccabili.
          </p>
        </div>

        {/* Concepts grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {concepts.map((concept, index) => (
            <div
              key={concept.title}
              className="demo-card group hover:border-primary/50 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={`text-3xl p-3 rounded-lg bg-${concept.color}/10 group-hover:scale-110 transition-transform`}>
                  {concept.icon}
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-lg font-semibold">{concept.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {concept.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
