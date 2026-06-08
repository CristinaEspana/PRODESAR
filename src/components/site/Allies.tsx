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
    <section id="alianzas" className="py-20 bg-background border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Alianzas y cooperación
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground">
            Trabajamos junto a quienes creen en el cambio
          </h2>
        </div>
        <div className="mt-12 overflow-hidden">
          <div className="flex gap-12 animate-[scroll_30s_linear_infinite] whitespace-nowrap">
            {[...allies, ...allies].map((a, i) => (
              <span
                key={i}
                className="text-lg font-semibold text-muted-foreground/70 hover:text-primary transition-colors shrink-0"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}
