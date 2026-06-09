import { Calendar, ArrowUpRight } from "lucide-react";

const items = [
  {
    tag: "Noticia",
    date: "15 May 2026",
    title: "PRODESAR firma alianza con cooperativa cafetera del Huila",
    excerpt: "Una nueva alianza fortalecerá a 150 familias productoras con prácticas sostenibles y comercio justo.",
    featured: true,
  },
  {
    tag: "Evento",
    date: "02 Jun 2026",
    title: "Foro regional: Innovación social en territorios rurales",
    excerpt: "Convocamos a líderes y aliados para reflexionar sobre los retos del desarrollo sostenible.",
  },
  {
    tag: "Convocatoria",
    date: "20 Jun 2026",
    title: "Abierta la Escuela de Liderazgo Comunitario 2026",
    excerpt: "Cupos limitados para jóvenes líderes de comunidades vinculadas a nuestros proyectos.",
  },
];

export function News() {
  return (
    <section id="noticias" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-8 mb-14">
          <div className="lg:col-span-3">
            <span className="block text-[11px] uppercase tracking-[0.25em] font-bold text-primary">
              07 — Actualidad
            </span>
            <div className="mt-4 h-px w-16 bg-foreground" />
          </div>
          <div className="lg:col-span-9 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display font-black text-[clamp(2rem,5vw,4.5rem)] leading-[1] tracking-[-0.03em] text-foreground">
              Lo último de <span className="italic text-primary">PRODESAR</span>.
            </h2>
            <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all">
              Ver todas <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* layout magazine: 1 destacada + 2 secundarias */}
        <div className="grid lg:grid-cols-3 gap-6">
          {items.map((n, i) => (
            <article
              key={n.title}
              className={`group flex flex-col p-7 rounded-3xl border border-border hover:shadow-elegant transition-all ${
                n.featured
                  ? "lg:row-span-2 lg:col-span-1 bg-foreground text-background lg:p-10"
                  : "bg-surface"
              }`}
            >
              <div className="flex items-center gap-3 text-xs">
                <span className={`px-2.5 py-1 rounded-full font-bold uppercase tracking-[0.18em] text-[10px] ${
                  n.featured ? "bg-brand-gold text-foreground" : "bg-foreground text-background"
                }`}>
                  {n.tag}
                </span>
                <span className={`inline-flex items-center gap-1 ${n.featured ? "text-background/70" : "text-muted-foreground"}`}>
                  <Calendar className="h-3 w-3" aria-hidden /> {n.date}
                </span>
              </div>
              <h3 className={`mt-5 font-display font-extrabold leading-[1.05] tracking-[-0.02em] ${
                n.featured ? "text-3xl lg:text-4xl" : "text-xl"
              }`}>
                {n.title}
              </h3>
              <p className={`mt-3 text-sm leading-relaxed flex-1 ${
                n.featured ? "text-background/75 text-base" : "text-muted-foreground"
              }`}>
                {n.excerpt}
              </p>
              <a
                href="#"
                className={`mt-6 inline-flex items-center gap-2 text-sm font-bold ${
                  n.featured ? "text-brand-gold" : "text-primary"
                } hover:gap-3 transition-all`}
              >
                Leer más <ArrowUpRight className="h-4 w-4" />
              </a>
              {i !== 0 && <span className="sr-only">{i}</span>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
