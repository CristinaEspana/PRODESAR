import { ShieldCheck, HeartHandshake, Sprout, Lightbulb, Users, BadgeCheck } from "lucide-react";

const values = [
  { icon: ShieldCheck, label: "Transparencia" },
  { icon: HeartHandshake, label: "Compromiso social" },
  { icon: Sprout, label: "Sostenibilidad" },
  { icon: Lightbulb, label: "Innovación" },
  { icon: Users, label: "Inclusión" },
  { icon: BadgeCheck, label: "Responsabilidad" },
];

export function About() {
  return (
    <section id="quienes-somos" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* eyebrow */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-3">
            <span className="block text-[11px] uppercase tracking-[0.25em] font-bold text-primary">
              01 — Quiénes somos
            </span>
            <div className="mt-4 h-px w-16 bg-foreground" />
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-display font-black text-[clamp(2rem,5vw,4.5rem)] leading-[1] tracking-[-0.03em] text-foreground">
              Una fundación al servicio del{" "}
              <span className="italic text-secondary">desarrollo sostenible</span>.
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Texto introductorio + Misión/Visión */}
          <div className="lg:col-span-7 lg:col-start-4">
            <p className="text-xl text-muted-foreground leading-relaxed first-letter:font-display first-letter:text-7xl first-letter:font-black first-letter:text-primary first-letter:float-left first-letter:leading-[0.9] first-letter:mr-3 first-letter:mt-1">
              PRODESAR nace con el propósito de impulsar iniciativas que integren el crecimiento
              económico, la inclusión social y la conservación ambiental. Trabajamos junto a las
              comunidades para diseñar y ejecutar proyectos que transforman ideas en oportunidades reales.
            </p>

            <div className="mt-12 grid sm:grid-cols-2 gap-5">
              <article className="p-7 rounded-2xl bg-surface border border-border">
                <span className="text-[11px] uppercase tracking-[0.22em] font-bold text-primary">Misión</span>
                <p className="mt-3 text-base text-foreground leading-relaxed">
                  Formular y ejecutar proyectos sostenibles que generen impacto social, ambiental
                  y económico, fortaleciendo capacidades y oportunidades duraderas.
                </p>
              </article>
              <article className="p-7 rounded-2xl bg-foreground text-background border border-foreground">
                <span className="text-[11px] uppercase tracking-[0.22em] font-bold text-brand-gold">Visión</span>
                <p className="mt-3 text-base leading-relaxed">
                  Ser una organización líder en desarrollo sostenible, reconocida por su
                  transparencia, innovación y compromiso con el bienestar colectivo.
                </p>
              </article>
            </div>
          </div>
        </div>

        {/* Valores en grid editorial */}
        <div className="mt-20 lg:mt-28 border-t border-border pt-10">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground">
              Valores institucionales
            </h3>
            <span className="text-xs uppercase tracking-[0.22em] font-bold text-muted-foreground">
              06 principios
            </span>
          </div>

          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border rounded-3xl overflow-hidden">
            {values.map(({ icon: Icon, label }, i) => (
              <li
                key={label}
                className="group bg-background p-6 flex flex-col gap-4 hover:bg-accent transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="text-[11px] font-bold text-muted-foreground tabular-nums">
                    0{i + 1}
                  </span>
                </div>
                <span className="font-display font-bold text-base text-foreground leading-tight">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
