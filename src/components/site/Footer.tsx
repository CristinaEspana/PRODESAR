import logoAsset from "@/assets/prodesar-logo.png.asset.json";
import { Facebook, Instagram, Linkedin, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 py-20">
        {/* Top: marca enorme */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 border-b border-white/10 pb-12">
          <div>
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-background">
                <img src={logoAsset.url} alt="Logo PRODESAR" className="h-12 w-12 object-contain" />
              </span>
              <div>
                <p className="font-display font-black text-3xl tracking-tight">PRODESAR</p>
                <p className="text-[11px] uppercase tracking-[0.22em] text-background/60">
                  Fundación · Proyectos & Desarrollo
                </p>
              </div>
            </div>
            <p className="mt-8 font-display font-black text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.03em] max-w-3xl">
              Transformando ideas en <span className="italic text-brand-gold">desarrollo sostenible</span>.
            </p>
          </div>

          <a href="#contacto" className="group inline-flex items-center gap-3 rounded-full bg-brand-gold text-foreground px-6 py-4 font-bold shrink-0">
            Trabajemos juntos
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mid: columnas */}
        <div className="grid md:grid-cols-4 gap-10 py-12 border-b border-white/10">
          <div className="md:col-span-2 max-w-md">
            <span className="text-[11px] uppercase tracking-[0.22em] font-bold text-brand-gold">
              Sobre PRODESAR
            </span>
            <p className="mt-4 text-sm text-background/75 leading-relaxed">
              Diseñamos y ejecutamos proyectos con impacto social, ambiental y económico para
              transformar territorios junto a las comunidades.
            </p>
            <div className="mt-6 flex gap-3">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Red social"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:bg-brand-gold hover:text-foreground hover:border-brand-gold transition-colors"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] font-bold text-brand-gold">
              Navegación
            </span>
            <ul className="mt-4 space-y-2.5 text-sm text-background/80">
              <li><a href="#quienes-somos" className="hover:text-background">Quiénes somos</a></li>
              <li><a href="#pilares" className="hover:text-background">Pilares</a></li>
              <li><a href="#proyectos" className="hover:text-background">Proyectos</a></li>
              <li><a href="#impacto" className="hover:text-background">Impacto</a></li>
              <li><a href="#donaciones" className="hover:text-background">Donaciones</a></li>
              <li><a href="#contacto" className="hover:text-background">Contacto</a></li>
            </ul>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] font-bold text-brand-gold">
              Legal
            </span>
            <ul className="mt-4 space-y-2.5 text-sm text-background/80">
              <li><a href="#" className="hover:text-background">Política de privacidad</a></li>
              <li><a href="#" className="hover:text-background">Términos de uso</a></li>
              <li><a href="#" className="hover:text-background">Transparencia</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-background/55">
          <p>© {new Date().getFullYear()} PRODESAR — Fundación Proyectos y Desarrollo.</p>
          <p>Hecho con compromiso por un futuro sostenible 🌱</p>
        </div>
      </div>
    </footer>
  );
}
