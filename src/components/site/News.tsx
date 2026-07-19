import { Calendar, ArrowUpRight } from "lucide-react";
import type { PublicNews } from "@/lib/public-content.functions";

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

export function News({ items }: { items: PublicNews[] }) {
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
              key={n.id}
              className="group p-6 rounded-2xl bg-card border border-border hover:shadow-elegant transition-all flex flex-col"
            >
              {n.image_url && (
                <div className="-mx-6 -mt-6 mb-4 aspect-[16/9] overflow-hidden rounded-t-2xl">
                  <img
                    src={n.image_url}
                    alt=""
                    loading="lazy"
                    className="size-full object-cover"
                  />
                </div>
              )}
              <div className="flex items-center gap-3 text-xs">
                <span className="px-2.5 py-1 rounded-full bg-gradient-brand text-primary-foreground font-semibold">
                  {n.tag}
                </span>
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-3 w-3" aria-hidden="true" /> {formatDate(n.published_date)}
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
