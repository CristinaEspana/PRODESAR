import { Users, GraduationCap, Leaf, Briefcase, Lightbulb, ClipboardList } from "lucide-react";

const areas = [
  { icon: Users, title: "Desarrollo comunitario", desc: "Fortalecimiento del tejido social y la organización de las comunidades." },
  { icon: GraduationCap, title: "Educación y capacitación", desc: "Formación que abre oportunidades y construye capacidades locales." },
  { icon: Leaf, title: "Medio ambiente", desc: "Protección de ecosistemas y restauración de la biodiversidad." },
  { icon: Briefcase, title: "Emprendimiento", desc: "Acompañamiento a iniciativas productivas sostenibles." },
  { icon: Lightbulb, title: "Innovación social", desc: "Soluciones creativas a los retos sociales más urgentes." },
  { icon: ClipboardList, title: "Gestión de proyectos", desc: "Formulación, ejecución y evaluación con altos estándares." },
];

export function Areas() {
  return (
    <section id="areas" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-3">
            <span className="block text-[11px] uppercase tracking-[0.25em] font-bold text-primary">
              03 — Áreas de acción
            </span>
            <div className="mt-4 h-px w-16 bg-foreground" />
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-display font-black text-[clamp(2rem,5vw,4.5rem)] leading-[1] tracking-[-0.03em] text-foreground">
              Donde concentramos nuestro <span className="italic text-secondary">impacto</span>.
            </h2>
          </div>
        </div>

        {/* lista numerada estilo índice editorial */}
        <ol className="border-t border-border">
          {areas.map(({ icon: Icon, title, desc }, i) => (
            <li
              key={title}
              className="group grid grid-cols-12 gap-6 py-7 border-b border-border hover:bg-surface transition-colors px-2"
            >
              <span className="col-span-2 sm:col-span-1 font-display font-black text-2xl text-muted-foreground tabular-nums">
                0{i + 1}
              </span>
              <div className="col-span-10 sm:col-span-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-foreground">
                  {title}
                </h3>
              </div>
              <p className="col-span-12 sm:col-span-6 sm:col-start-7 text-base text-muted-foreground leading-relaxed self-center">
                {desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
