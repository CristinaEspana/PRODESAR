import { HandHeart, HeartHandshake, Handshake, ArrowRight } from "lucide-react";

const options = [
  { icon: HandHeart, title: "Donaciones", desc: "Tu aporte se convierte en árboles sembrados, niños en la escuela y familias emprendiendo." },
  { icon: HeartHandshake, title: "Voluntariado", desc: "Suma tu tiempo y tus talentos a proyectos que cambian vidas y territorios." },
  { icon: Handshake, title: "Alianzas", desc: "Conectamos empresas e instituciones para escalar el impacto." },
];

export function Donate() {
  return (
    <section id="donaciones" className="py-24 lg:py-32 bg-surface">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-8 mb-14">
          <div className="lg:col-span-3">
            <span className="block text-[11px] uppercase tracking-[0.25em] font-bold text-primary">
              08 — Apoya
            </span>
            <div className="mt-4 h-px w-16 bg-foreground" />
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-display font-black text-[clamp(2rem,5vw,4.5rem)] leading-[1] tracking-[-0.03em] text-foreground">
              Sé parte del <span className="italic text-secondary">cambio</span> que necesitamos.
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Bloque principal con CTA */}
          <div className="lg:col-span-7 relative rounded-3xl bg-primary text-primary-foreground p-10 lg:p-14 overflow-hidden">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
              aria-hidden
            />
            <div className="relative">
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-brand-gold">
                Donaciones y apoyo
              </span>
              <h3 className="mt-5 font-display font-black text-4xl lg:text-5xl leading-[1.05] max-w-xl">
                Cada gesto suma. Transformemos juntos.
              </h3>
              <p className="mt-5 text-base lg:text-lg text-background/85 max-w-lg">
                Súmate a PRODESAR y sé parte del cambio que el planeta y nuestras comunidades necesitan.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#contacto" className="group inline-flex items-center gap-2 rounded-full bg-brand-gold text-foreground px-6 py-3.5 font-bold hover:opacity-90 transition-opacity">
                  Donar ahora <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a href="#contacto" className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-6 py-3.5 font-bold text-background hover:bg-white/10 transition-colors">
                  Ser voluntario
                </a>
              </div>
            </div>
          </div>

          {/* Lista de opciones */}
          <ul className="lg:col-span-5 grid gap-4">
            {options.map(({ icon: Icon, title, desc }, i) => (
              <li
                key={title}
                className="group p-6 rounded-2xl bg-background border border-border flex gap-5 hover:border-primary transition-colors"
              >
                <span className="font-display font-black text-3xl text-muted-foreground tabular-nums shrink-0 w-10">
                  0{i + 1}
                </span>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h4 className="font-display font-extrabold text-lg text-foreground">{title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
