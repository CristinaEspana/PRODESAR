import ambImg from "@/assets/pillar-ambiental.jpg";
import ecoImg from "@/assets/pillar-economico.jpg";
import socImg from "@/assets/pillar-social.jpg";
import { TreePine, TrendingUp, Users2 } from "lucide-react";

const pillars = [
  {
    n: "01",
    icon: TreePine,
    title: "Ambiental",
    image: ambImg,
    desc: "Conservar la biodiversidad y garantizar que el uso de los recursos naturales no supere su capacidad de regeneración.",
    tags: ["Bosques", "Agua", "Energía", "Biodiversidad"],
    accent: "bg-secondary text-secondary-foreground",
  },
  {
    n: "02",
    icon: TrendingUp,
    title: "Económico",
    image: ecoImg,
    desc: "Promover un crecimiento sostenible que genere oportunidades, empleo y prosperidad sin comprometer al futuro.",
    tags: ["Emprendimiento", "Innovación", "Productividad"],
    accent: "bg-foreground text-background",
  },
  {
    n: "03",
    icon: Users2,
    title: "Social",
    image: socImg,
    desc: "Fomentar la inclusión, reducir desigualdades y mejorar la calidad de vida mediante proyectos que fortalezcan comunidades.",
    tags: ["Educación", "Liderazgo", "Equidad", "Bienestar"],
    accent: "bg-primary text-primary-foreground",
  },
];

export function Pillars() {
  return (
    <section id="pilares" className="py-24 lg:py-32 bg-surface relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-3">
            <span className="block text-[11px] uppercase tracking-[0.25em] font-bold text-primary">
              02 — Pilares
            </span>
            <div className="mt-4 h-px w-16 bg-foreground" />
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-display font-black text-[clamp(2rem,5vw,4.5rem)] leading-[1] tracking-[-0.03em] text-foreground">
              Tres dimensiones, un mismo{" "}
              <span className="italic text-primary">equilibrio</span>.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              El balance entre lo ambiental, lo económico y lo social es la base de cada proyecto
              que diseñamos y ejecutamos.
            </p>
          </div>
        </div>

        {/* Tarjetas asimétricas tipo magazine */}
        <div className="grid md:grid-cols-3 gap-5">
          {pillars.map(({ n, icon: Icon, title, image, desc, tags, accent }, i) => (
            <article
              key={title}
              className={`group relative overflow-hidden rounded-3xl border border-border bg-background shadow-card hover:shadow-elegant transition-all ${
                i === 1 ? "md:translate-y-8" : ""
              }`}
            >
              <div className="relative aspect-[5/4] overflow-hidden">
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  className="size-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className={`absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] ${accent}`}>
                  <Icon className="h-3.5 w-3.5" aria-hidden /> {title}
                </span>
                <span className="absolute top-4 right-4 font-display font-black text-3xl text-white drop-shadow">
                  {n}
                </span>
              </div>
              <div className="p-7">
                <h3 className="font-display font-extrabold text-2xl text-foreground">
                  Pilar {title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <li key={t} className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border border-border text-foreground/70">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
