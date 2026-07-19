import {
  Users,
  GraduationCap,
  Leaf,
  Briefcase,
  Lightbulb,
  ClipboardList,
  Heart,
  Globe,
  Sprout,
  Handshake,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import type { PublicFocusArea } from "@/lib/public-content.functions";

const ICONS: Record<string, LucideIcon> = {
  Users,
  GraduationCap,
  Leaf,
  Briefcase,
  Lightbulb,
  ClipboardList,
  Heart,
  Globe,
  Sprout,
  Handshake,
  BookOpen,
};

export const AVAILABLE_ICON_NAMES = Object.keys(ICONS);

export function Areas({ items }: { items: PublicFocusArea[] }) {
  return (
    <section id="areas" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Áreas de acción
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-foreground">
            Dónde concentramos nuestro <span className="text-gradient-brand">impacto</span>
          </h2>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((a) => {
            const Icon = ICONS[a.icon_name] ?? Users;
            return (
              <article
                key={a.id}
                className="group p-7 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-elegant transition-all"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary group-hover:bg-gradient-brand group-hover:text-primary-foreground transition-colors">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-foreground">{a.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {a.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
