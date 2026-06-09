import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import { MapPin, ArrowUpRight } from "lucide-react";

const projects = [
  {
    img: p1,
    n: "P/01",
    name: "Reforestando el Páramo",
    location: "Boyacá",
    desc: "Restauración ecológica con especies nativas y participación comunitaria.",
    objective: "50.000 árboles en 3 años",
    results: "12.500 sembrados · 8 veredas",
    tag: "Ambiental",
  },
  {
    img: p2,
    n: "P/02",
    name: "Aulas Conectadas",
    location: "Cauca",
    desc: "Educación digital y conectividad para escuelas rurales con docentes capacitados.",
    objective: "30 escuelas rurales",
    results: "18 equipadas · 1.200 estudiantes",
    tag: "Social",
  },
  {
    img: p3,
    n: "P/03",
    name: "Café con Propósito",
    location: "Huila",
    desc: "Fortalecimiento de cooperativas con prácticas sostenibles y comercio justo.",
    objective: "200 familias productoras",
    results: "150 activas · +35 % ingreso",
    tag: "Económico",
  },
];

export function Projects() {
  return (
    <section id="proyectos" className="py-24 lg:py-32 bg-foreground text-background">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-8 mb-14">
          <div className="lg:col-span-3">
            <span className="block text-[11px] uppercase tracking-[0.25em] font-bold text-brand-gold">
              04 — Proyectos
            </span>
            <div className="mt-4 h-px w-16 bg-brand-gold" />
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-display font-black text-[clamp(2rem,5vw,4.5rem)] leading-[1] tracking-[-0.03em]">
              Iniciativas que <span className="italic text-brand-gold">transforman</span> territorios.
            </h2>
            <p className="mt-6 text-lg text-background/70 max-w-2xl">
              Cada proyecto se construye junto con las comunidades, con metas claras y
              resultados medibles que rinden cuentas.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <article
              key={p.name}
              className="group bg-background text-foreground rounded-3xl overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="size-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-background/95 backdrop-blur text-[11px] font-bold uppercase tracking-[0.18em] text-foreground">
                  {p.tag}
                </span>
                <span className="absolute top-4 right-4 font-display font-black text-sm text-white bg-foreground/70 backdrop-blur rounded-full px-3 py-1.5 tracking-wider">
                  {p.n}
                </span>
              </div>
              <div className="p-7 flex flex-col flex-1">
                <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
                  <MapPin className="h-3 w-3" aria-hidden /> {p.location} · Colombia
                </span>
                <h3 className="mt-3 font-display font-extrabold text-2xl text-foreground">
                  {p.name}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>

                <dl className="mt-6 grid grid-cols-2 gap-4 text-xs border-t border-border pt-5">
                  <div>
                    <dt className="uppercase tracking-[0.18em] font-bold text-muted-foreground">Objetivo</dt>
                    <dd className="mt-1 font-semibold text-foreground">{p.objective}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-[0.18em] font-bold text-muted-foreground">Resultados</dt>
                    <dd className="mt-1 font-semibold text-foreground">{p.results}</dd>
                  </div>
                </dl>

                <a href="#" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all">
                  Leer caso completo <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
