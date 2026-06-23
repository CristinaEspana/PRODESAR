import { HandHeart, HeartHandshake, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";

const options = [
  {
    icon: HandHeart,
    title: "Donaciones",
    desc: "Tu aporte se convierte en árboles sembrados, niños en la escuela y familias emprendiendo.",
  },
  {
    icon: HeartHandshake,
    title: "Voluntariado",
    desc: "Suma tu tiempo y tus talentos a proyectos que cambian vidas y territorios.",
  },
  {
    icon: Handshake,
    title: "Alianzas estratégicas",
    desc: "Conectamos empresas, instituciones y organizaciones para escalar el impacto.",
  },
];

export function Donate() {
  return (
    <section id="donaciones" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-brand p-10 sm:p-14 lg:p-20 overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
            aria-hidden="true"
          />
          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-primary-foreground">
              <span className="text-sm font-semibold uppercase tracking-widest text-white/80">
                Donaciones y apoyo
              </span>
              <h2 className="mt-3 text-4xl sm:text-5xl font-bold leading-tight">
                Apoya nuestra misión y transformemos juntos
              </h2>
              <p className="mt-5 text-lg text-white/90 max-w-xl">
                Cada gesto cuenta. Súmate a PRODESAR y sé parte del cambio que el planeta y nuestras
                comunidades necesitan.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold min-h-11">
                  <a href="#contacto">Apoya nuestra misión</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/70 bg-white/10 text-white hover:bg-white/20 backdrop-blur min-h-11">
                  <a href="#contacto">Quiero ser voluntario</a>
                </Button>
              </div>
            </div>

            <ul className="space-y-4">
              {options.map(({ icon: Icon, title, desc }) => (
                <li
                  key={title}
                  className="p-5 rounded-2xl bg-white/10 backdrop-blur border border-white/20 text-primary-foreground flex gap-4"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-primary">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="text-sm text-white/85 mt-1">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
