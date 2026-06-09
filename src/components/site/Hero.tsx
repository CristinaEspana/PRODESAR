import heroImg from "@/assets/hero-prodesar.jpg";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section id="inicio" className="relative bg-background pt-28 pb-16 overflow-hidden">
      {/* meta strip */}
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.22em] font-semibold text-muted-foreground border-b border-border pb-4">
          <span>Edición · {new Date().getFullYear()}</span>
          <span className="hidden md:inline">Proyectos · Comunidades · Territorio</span>
          <span className="text-primary">Nº 01 — Desarrollo Sostenible</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 pt-10 lg:pt-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Eyebrow + headline */}
          <div className="lg:col-span-8 animate-fade-up">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <span className="h-px w-8 bg-primary" />
              Fundación Proyectos y Desarrollo
            </span>
            <h1 className="mt-6 font-display font-black text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.035em] text-foreground">
              Transformamos<br />
              ideas en{" "}
              <span className="relative inline-block">
                <span className="text-gradient-brand italic">desarrollo</span>
                <span className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-gold rounded-full" aria-hidden />
              </span>
              <br />sostenible.
            </h1>
          </div>

          {/* side note */}
          <div className="lg:col-span-4 animate-fade-up" style={{ animationDelay: "120ms" }}>
            <div className="border-l-2 border-primary pl-6">
              <p className="text-base text-muted-foreground leading-relaxed">
                PRODESAR diseña y ejecuta proyectos que integran el{" "}
                <span className="text-foreground font-semibold">crecimiento económico</span>,
                la <span className="text-foreground font-semibold">inclusión social</span> y la{" "}
                <span className="text-foreground font-semibold">conservación ambiental</span>.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#proyectos"
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm font-semibold hover:bg-primary transition-colors"
                >
                  Ver proyectos <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-foreground/15 px-5 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
                >
                  Contáctanos <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Imagen editorial + datos flotantes */}
        <div className="mt-14 lg:mt-20 grid lg:grid-cols-12 gap-6 items-stretch animate-fade-up" style={{ animationDelay: "240ms" }}>
          <figure className="lg:col-span-9 relative overflow-hidden rounded-3xl">
            <img
              src={heroImg}
              alt="Comunidad rural plantando árboles al amanecer"
              className="w-full h-[420px] md:h-[560px] object-cover"
              width={1920}
              height={1080}
              fetchPriority="high"
            />
            <div className="absolute inset-0" style={{ backgroundImage: "var(--gradient-hero-overlay)" }} aria-hidden />
            <figcaption className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-6 text-white">
              <p className="text-sm md:text-base max-w-md font-medium">
                Construimos junto a las comunidades un futuro con oportunidades reales y un planeta que perdure.
              </p>
              <span className="hidden md:inline text-[11px] uppercase tracking-[0.22em] opacity-80">
                Boyacá · Colombia
              </span>
            </figcaption>
          </figure>

          {/* lateral stats */}
          <aside className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="rounded-3xl bg-primary text-primary-foreground p-6 flex flex-col justify-between">
              <span className="text-[11px] uppercase tracking-[0.2em] opacity-80">Comunidades</span>
              <span className="font-display font-black text-5xl mt-4">42<span className="text-brand-gold">+</span></span>
              <span className="text-xs mt-2 opacity-80">beneficiadas en 3 regiones</span>
            </div>
            <div className="rounded-3xl bg-accent p-6 flex flex-col justify-between">
              <span className="text-[11px] uppercase tracking-[0.2em] text-accent-foreground opacity-80">Árboles</span>
              <span className="font-display font-black text-5xl mt-4 text-accent-foreground">12.5K</span>
              <span className="text-xs mt-2 text-accent-foreground/80">sembrados con enfoque comunitario</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
