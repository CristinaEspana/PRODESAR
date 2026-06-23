import { Calendar, ArrowUpRight } from "lucide-react";

const items = [
  {
    tag: "Noticia",
    date: "15 May 2026",
    title: "PRODESAR firma alianza con cooperativa cafetera del Huila",
    excerpt: "Una nueva alianza fortalecerá a 150 familias productoras con prácticas sostenibles.",
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
    title: "Abierta inscripción a la Escuela de Liderazgo Comunitario 2026",
    excerpt: "Cupos limitados para jóvenes líderes de comunidades vinculadas a nuestros proyectos.",
  },
];

export function News() {
  return (
    <section id="noticias" className="py-24 bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Noticias y actualidad
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-foreground">
              Lo último de <span className="text-gradient-brand">PRODESAR</span>
            </h2>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {items.map((n) => (
            <article
              key={n.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:shadow-elegant transition-all flex flex-col"
            >
              <div className="flex items-center gap-3 text-xs">
                <span className="px-2.5 py-1 rounded-full bg-gradient-brand text-primary-foreground font-semibold">
                  {n.tag}
                </span>
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-3 w-3" aria-hidden="true" /> {n.date}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                {n.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground flex-1">{n.excerpt}</p>
              <a
                href="#"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
              >
                Leer más <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
