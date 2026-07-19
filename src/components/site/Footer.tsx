import logoAsset from "@/assets/prodesar-logo.png";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[oklch(0.18_0.04_260)] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src={logoAsset} alt="Logo PRODESAR" className="h-12 w-12 object-contain bg-white rounded-lg p-1" />
              <div>
                <p className="font-display font-bold text-xl">PRODESAR</p>
                <p className="text-xs text-white/70">Fundación Proyectos y Desarrollo</p>
              </div>
            </div>
            <p className="mt-5 text-sm text-white/75 max-w-md">
              Transformando ideas en desarrollo sostenible. Diseñamos y ejecutamos proyectos con
              impacto social, ambiental y económico.
            </p>
            <div className="mt-6 flex gap-3">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Red social"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 hover:bg-gradient-brand transition-colors"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white">Menú rápido</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              <li><a href="#quienes-somos" className="hover:text-white">Quiénes somos</a></li>
              <li><a href="#pilares" className="hover:text-white">Pilares</a></li>
              <li><a href="#proyectos" className="hover:text-white">Proyectos</a></li>
              <li><a href="#impacto" className="hover:text-white">Impacto</a></li>
              <li><a href="#donaciones" className="hover:text-white">Donaciones</a></li>
              <li><a href="#contacto" className="hover:text-white">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white">Información legal</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              <li><a href="#" className="hover:text-white">Política de privacidad</a></li>
              <li><a href="#" className="hover:text-white">Términos de uso</a></li>
              <li><a href="#" className="hover:text-white">Transparencia</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} PRODESAR — Fundación Proyectos y Desarrollo. Todos los derechos reservados.</p>
          <p>Hecho con compromiso por un futuro sostenible 🌱</p>
        </div>
      </div>
    </footer>
  );
}
