import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import logoAsset from "@/assets/prodesar-logo.png.asset.json";

const links = [
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
          ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-soft"
          : "bg-background/60 backdrop-blur-md"
      }`}
    >
      {/* franja dorada superior */}
      <div aria-hidden className="h-[3px] w-full bg-gradient-gold" />

      <nav className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-6">
        <a href="#inicio" className="group flex items-center gap-3" aria-label="PRODESAR inicio">
          <span className="relative flex h-16 w-16 -my-2 items-center justify-center rounded-full bg-white shadow-card ring-2 ring-[var(--brand-gold)]/60 ring-offset-2 ring-offset-background transition-transform group-hover:scale-105">
            {/* halo dorado */}
            <span
              aria-hidden
              className="absolute inset-0 rounded-full opacity-70 blur-md -z-10"
              style={{ background: "radial-gradient(circle, rgba(244,180,0,0.55) 0%, transparent 70%)" }}
            />
            <img src={logoAsset.url} alt="Logo PRODESAR" className="h-12 w-12 object-contain" />
          </span>
          <span className="leading-tight">
            <span className="block font-display font-extrabold text-[1.35rem] tracking-tight text-foreground">
              PRO<span className="text-[var(--brand-gold)]">DESAR</span>
            </span>
            <span className="block text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-semibold">
              Fundación · Proyectos & Desarrollo
            </span>
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground/75 hover:text-primary transition-colors"
              >
                {l.label}
                <span
                  aria-hidden
                  className="absolute -bottom-2 left-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-gold transition-transform duration-300 group-hover:scale-x-100"
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#donaciones"
            className="group relative inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-semibold overflow-hidden transition-colors hover:bg-[var(--brand-blue)]"
          >
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-gradient-gold transition-transform duration-500 group-hover:translate-x-0"
            />
            <span className="relative flex items-center gap-2 group-hover:text-[var(--ink)] transition-colors">
              Apoya la misión
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex items-center justify-center h-11 w-11 rounded-full bg-foreground text-background ring-2 ring-[var(--brand-gold)]/50"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <ul className="px-5 py-4 space-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-3 rounded-md text-base font-semibold text-foreground border-l-2 border-transparent hover:border-[var(--brand-gold)] hover:bg-accent hover:text-accent-foreground transition-all"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#donaciones"
                onClick={() => setOpen(false)}
                className="block text-center rounded-full bg-foreground text-background px-5 py-3 text-sm font-semibold ring-2 ring-[var(--brand-gold)]/60"
              >
                Apoya la misión
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
