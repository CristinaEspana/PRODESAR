import { useState } from "react";
import { z } from "zod";
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Linkedin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2, "Ingresa tu nombre").max(100),
  email: z.string().trim().email("Correo inválido").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Escribe al menos 10 caracteres").max(1000),
  website: z.string().max(0).optional().or(z.literal("")),
});

export function Contact() {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const result = schema.safeParse(Object.fromEntries(fd));
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Datos inválidos");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      (e.target as HTMLFormElement).reset();
      toast.success("¡Mensaje enviado! Te contactaremos pronto.");
    }, 800);
  };

  return (
    <section id="contacto" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-8 mb-14">
          <div className="lg:col-span-3">
            <span className="block text-[11px] uppercase tracking-[0.25em] font-bold text-primary">
              09 — Contacto
            </span>
            <div className="mt-4 h-px w-16 bg-foreground" />
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-display font-black text-[clamp(2rem,5vw,4.5rem)] leading-[1] tracking-[-0.03em] text-foreground">
              Hablemos de cómo <span className="italic text-primary">colaborar</span>.
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <p className="text-lg text-muted-foreground leading-relaxed">
              ¿Tienes una idea, un proyecto o quieres aliarte con nosotros? Escríbenos y te
              responderemos a la brevedad.
            </p>

            <ul className="mt-10 divide-y divide-border border-y border-border">
              {[
                { Icon: MapPin, title: "Dirección", value: "Calle 123 # 45-67, Bogotá, Colombia" },
                { Icon: Mail, title: "Correo", value: "contacto@prodesar.org", href: "mailto:contacto@prodesar.org" },
                { Icon: Phone, title: "Teléfono", value: "+57 1 600 0000", href: "tel:+5716000000" },
              ].map(({ Icon, title, value, href }) => (
                <li key={title} className="py-5 flex items-center gap-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground shrink-0">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="flex-1">
                    <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-muted-foreground">{title}</p>
                    {href ? (
                      <a href={href} className="block font-semibold text-foreground hover:text-primary">{value}</a>
                    ) : (
                      <p className="font-semibold text-foreground">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex gap-3">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Linkedin, label: "LinkedIn" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-foreground hover:bg-foreground hover:text-background transition-colors"
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </a>
              ))}
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Mapa ubicación PRODESAR"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-74.10%2C4.60%2C-74.02%2C4.68&amp;layer=mapnik"
                className="w-full h-64"
                loading="lazy"
              />
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-surface border border-border"
            noValidate
          >
            <h3 className="font-display font-extrabold text-3xl text-foreground">
              Envíanos un mensaje
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Completa el formulario y nuestro equipo se pondrá en contacto.
            </p>
            <div className="mt-8 grid gap-5">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
              <div>
                <Label htmlFor="name" className="text-[11px] uppercase tracking-[0.18em] font-bold text-muted-foreground">Nombre</Label>
                <Input id="name" name="name" required maxLength={100} className="mt-2 bg-background h-12" placeholder="Tu nombre completo" />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="email" className="text-[11px] uppercase tracking-[0.18em] font-bold text-muted-foreground">Correo</Label>
                  <Input id="email" name="email" type="email" required maxLength={255} className="mt-2 bg-background h-12" placeholder="tu@correo.com" />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-[11px] uppercase tracking-[0.18em] font-bold text-muted-foreground">Teléfono</Label>
                  <Input id="phone" name="phone" type="tel" maxLength={30} className="mt-2 bg-background h-12" placeholder="+57 300 000 0000" />
                </div>
              </div>
              <div>
                <Label htmlFor="message" className="text-[11px] uppercase tracking-[0.18em] font-bold text-muted-foreground">Mensaje</Label>
                <Textarea id="message" name="message" required minLength={10} maxLength={1000} rows={5} className="mt-2 bg-background" placeholder="Cuéntanos en qué podemos ayudarte..." />
              </div>
              <Button type="submit" disabled={loading} size="lg" className="group bg-foreground text-background hover:bg-primary min-h-12 rounded-full font-bold">
                {loading ? "Enviando…" : (<>Enviar mensaje <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></>)}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
