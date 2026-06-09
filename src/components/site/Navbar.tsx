import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/prodesar-logo.png.asset.json";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "#quienes-somos", label: "Quiénes somos" },
  { href: "#pilares", label: "Pilares" },
  { href: "#areas", label: "Áreas" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#impacto", label: "Impacto" },
  { href: "#contacto", label: "Contacto" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/75 backdrop-blur-xl border-b border-border/60 shadow-soft"
          : "bg-gradient-to-b from-background/40 via-background/10 to-transparent backdrop-blur-sm"
      }`}
    >
      {/* Decorative accent line */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-[3px] bg-gradient-brand opacity-90"
      />

      {/* Ambient glow behind logo */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute left-0 top-0 h-24 w-[28rem] max-w-[60%] transition-opacity duration-500 ${
          scrolled ? "opacity-40" : "opacity-70"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at 15% 50%, color-mix(in oklab, var(--brand-green) 35%, transparent) 0%, transparent 65%)",
        }}
      />

      <nav className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <a
          href="#inicio"
          className="group relative flex items-center gap-3"
          aria-label="PRODESAR inicio"
        >
          {/* Immersive logo badge — bleeds slightly outside the header */}
          <span
            aria-hidden="true"
            className="absolute -left-3 -top-2 h-20 w-20 rounded-full bg-gradient-brand opacity-95 blur-[1px] shadow-elegant transition-transform duration-500 group-hover:scale-105"
          />
          <span
            aria-hidden="true"
            className="absolute -left-3 -top-2 h-20 w-20 rounded-full ring-1 ring-white/30"
          />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-soft ring-2 ring-white/70 backdrop-blur">
            <img
              src={logoAsset.url}
              alt="Logo PRODESAR"
              className="h-12 w-12 object-contain"
            />
          </span>
          <span className="relative ml-2 leading-tight">
            <span className="block font-display font-extrabold text-xl tracking-tight text-foreground">
              PRO<span className="text-gradient-brand">DESAR</span>
            </span>
            <span className="block text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-medium">
              Proyectos y Desarrollo
            </span>
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:bg-gradient-brand after:rounded-full after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button
            asChild
            className="bg-gradient-brand text-primary-foreground hover:opacity-90 shadow-soft rounded-full px-5"
          >
            <a href="#donaciones">Apoya nuestra misión</a>
          </Button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex items-center justify-center min-h-11 min-w-11 rounded-full bg-background/70 backdrop-blur border border-border text-foreground hover:bg-accent"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <ul className="px-4 py-4 space-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-3 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-primary"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <Button asChild className="w-full bg-gradient-brand text-primary-foreground rounded-full">
                <a href="#donaciones" onClick={() => setOpen(false)}>
                  Apoya nuestra misión
                </a>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
