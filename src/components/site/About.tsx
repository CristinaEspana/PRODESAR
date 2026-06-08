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
    <section id="quienes-somos" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Quiénes somos
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-foreground">
              Una <span className="text-gradient-brand">fundación</span> al servicio del desarrollo sostenible
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              PRODESAR — Fundación Proyectos y Desarrollo — nace con el propósito de impulsar
              iniciativas que integren el crecimiento económico, la inclusión social y la
              conservación ambiental. Trabajamos junto a las comunidades para diseñar y ejecutar
              proyectos que transforman ideas en oportunidades reales.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-accent border border-border">
                <h3 className="font-semibold text-lg text-foreground">Misión</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Formular y ejecutar proyectos sostenibles que generen impacto social, ambiental y
                  económico en las comunidades, fortaleciendo sus capacidades y construyendo
                  oportunidades duraderas.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-brand-soft border border-border">
                <h3 className="font-semibold text-lg text-foreground">Visión</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Ser una organización líder en la formulación y ejecución de proyectos de
                  desarrollo sostenible, reconocida por su transparencia, innovación y compromiso
                  con el bienestar colectivo.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-foreground">Valores institucionales</h3>
            <p className="mt-3 text-muted-foreground">
              Principios que guían cada uno de nuestros proyectos y relaciones.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-4">
              {values.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="group flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-soft transition-all"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-green text-primary-foreground shrink-0">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-medium text-foreground">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
