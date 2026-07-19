import { MapPin, Target, TrendingUp } from "lucide-react";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import type { PublicProject } from "@/lib/public-content.functions";

const FALLBACK_IMAGES = [p1, p2, p3];

export function Projects({ items }: { items: PublicProject[] }) {
  return (
    <section id="proyectos" className="py-24 bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Proyectos
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-foreground">
              Iniciativas que <span className="text-gradient-brand">transforman</span> territorios
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            Cada proyecto se construye junto con las comunidades, con metas claras y resultados
            medibles.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((p, i) => (
            <article
              key={p.id}
              className="group bg-card rounded-3xl overflow-hidden border border-border shadow-soft hover:shadow-elegant transition-all hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={p.image_url ?? FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]}
                  alt={p.name}
                  loading="lazy"
                  className="size-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur text-xs font-medium text-foreground">
                  <MapPin className="h-3 w-3" aria-hidden="true" /> {p.location}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex gap-2">
                    <Target className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <dt className="font-semibold text-foreground">Objetivo</dt>
                      <dd className="text-muted-foreground">{p.objective}</dd>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <TrendingUp className="h-4 w-4 text-secondary mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <dt className="font-semibold text-foreground">Resultados</dt>
                      <dd className="text-muted-foreground">{p.results}</dd>
                    </div>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
