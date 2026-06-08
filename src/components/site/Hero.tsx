import heroImg from "@/assets/hero-prodesar.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf } from "lucide-react";

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-dvh flex items-center overflow-hidden pt-16">
      <img
        src={heroImg}
        alt="Comunidad rural plantando árboles en un valle andino al amanecer"
        className="absolute inset-0 size-full object-cover"
        width={1920}
        height={1080}
        fetchPriority="high"
      />
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "var(--gradient-hero-overlay)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="max-w-3xl text-white animate-fade-up">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur border border-white/20 text-sm font-medium">
            <Leaf className="h-4 w-4" aria-hidden="true" />
            Fundación Proyectos y Desarrollo
          </span>
          <h1 className="mt-6 font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[1.05]">
            PRO<span className="text-[oklch(0.85_0.18_140)]">DESAR</span>
          </h1>
          <p className="mt-6 text-xl sm:text-2xl font-light max-w-2xl text-white/95">
            Transformando ideas en{" "}
            <span className="font-semibold text-[oklch(0.88_0.18_140)]">desarrollo sostenible</span>.
          </p>
          <p className="mt-4 text-base sm:text-lg text-white/85 max-w-2xl">
            Construimos un futuro sostenible a través de proyectos que generan impacto social,
            ambiental y económico.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold min-h-11"
            >
              <a href="#proyectos">
                Conoce nuestros proyectos <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/70 bg-white/10 text-white hover:bg-white/20 backdrop-blur min-h-11"
            >
              <a href="#contacto">Contáctanos</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-xs tracking-widest uppercase animate-float" aria-hidden="true">
        Descubre más
      </div>
    </section>
  );
}
