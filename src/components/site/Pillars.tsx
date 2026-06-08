import ambImg from "@/assets/pillar-ambiental.jpg";
import ecoImg from "@/assets/pillar-economico.jpg";
import socImg from "@/assets/pillar-social.jpg";
import { TreePine, TrendingUp, Users2 } from "lucide-react";

const pillars = [
  {
    icon: TreePine,
    title: "Pilar Ambiental",
    image: ambImg,
    desc: "Conservar la biodiversidad y garantizar que el uso de los recursos naturales como el agua, los bosques y la energía no supere su capacidad de regeneración.",
    tags: ["Bosques", "Agua", "Energías renovables", "Biodiversidad"],
  },
  {
    icon: TrendingUp,
    title: "Pilar Económico",
    image: ecoImg,
    desc: "Promover un crecimiento económico sostenible que genere oportunidades, empleo y prosperidad sin comprometer los recursos de las futuras generaciones.",
    tags: ["Emprendimiento", "Innovación", "Productividad", "Empresa"],
  },
  {
    icon: Users2,
    title: "Pilar Social",
    image: socImg,
    desc: "Fomentar la inclusión, reducir las desigualdades y mejorar la calidad de vida mediante proyectos que fortalezcan a las comunidades.",
    tags: ["Educación", "Liderazgo", "Equidad", "Bienestar"],
  },
];

export function Pillars() {
  return (
    <section id="pilares" className="py-24 bg-muted/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-brand-soft opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Desarrollo sostenible
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-foreground">
            Los tres pilares que <span className="text-gradient-brand">sostienen</span> nuestro trabajo
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            El equilibrio entre lo ambiental, lo económico y lo social es la base de cada proyecto
            que diseñamos y ejecutamos.
          </p>
        </div>

        {/* Diagrama */}
        <div className="mt-14 flex justify-center">
          <svg viewBox="0 0 400 200" className="w-full max-w-md h-auto" aria-hidden="true">
            <defs>
              <linearGradient id="gg" x1="0" x2="1">
                <stop offset="0" stopColor="oklch(0.72 0.19 140)" />
                <stop offset="1" stopColor="oklch(0.32 0.12 260)" />
              </linearGradient>
            </defs>
            <circle cx="120" cy="120" r="60" fill="oklch(0.72 0.19 140 / 0.55)" />
            <circle cx="280" cy="120" r="60" fill="oklch(0.32 0.12 260 / 0.55)" />
            <circle cx="200" cy="60" r="60" fill="url(#gg)" fillOpacity="0.6" />
            <text x="120" y="125" textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="Poppins">Ambiental</text>
            <text x="280" y="125" textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="Poppins">Social</text>
            <text x="200" y="60" textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="Poppins">Económico</text>
          </svg>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {pillars.map(({ icon: Icon, title, image, desc, tags }) => (
            <article
              key={title}
              className="group relative bg-card rounded-3xl overflow-hidden border border-border shadow-soft hover:shadow-elegant transition-all hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  className="size-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-bold text-foreground">{title}</h3>
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <li
                      key={t}
                      className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent text-accent-foreground"
                    >
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
