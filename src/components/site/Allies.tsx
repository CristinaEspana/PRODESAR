const allies = [
  "Ministerio de Ambiente",
  "Alcaldía Local",
  "UNDP",
  "Universidad Nacional",
  "Cámara de Comercio",
  "WWF",
  "Fundación Natura",
  "USAID",
];

export function Allies() {
  return (
    <section id="alianzas" className="py-16 bg-surface border-y border-border">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-primary shrink-0">
            06 — Alianzas
          </span>
          <div className="hidden md:block h-px flex-1 bg-border" />
          <p className="text-sm text-muted-foreground">
            Trabajamos junto a quienes creen en el cambio.
          </p>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {[...allies, ...allies].map((a, i) => (
            <span
              key={i}
              className="font-display text-2xl md:text-3xl font-extrabold text-foreground/30 hover:text-foreground transition-colors shrink-0"
            >
              {a} <span className="text-brand-gold">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
