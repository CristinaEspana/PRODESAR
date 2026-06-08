import { useState } from "react";
import { z } from "zod";
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Linkedin } from "lucide-react";
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
  // honeypot
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
    <section id="contacto" className="py-24 bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Contacto
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-foreground">
              Hablemos de cómo <span className="text-gradient-brand">colaborar</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              ¿Tienes una idea, un proyecto o quieres aliarte con nosotros? Escríbenos y te
              responderemos a la brevedad.
            </p>

            <ul className="mt-10 space-y-5 text-sm">
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shrink-0">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-foreground">Dirección</p>
                  <p className="text-muted-foreground">Calle 123 # 45-67, Bogotá, Colombia</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shrink-0">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-foreground">Correo</p>
                  <a href="mailto:contacto@prodesar.org" className="text-muted-foreground hover:text-primary">
                    contacto@prodesar.org
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shrink-0">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-foreground">Teléfono</p>
                  <a href="tel:+5716000000" className="text-muted-foreground hover:text-primary">
                    +57 1 600 0000
                  </a>
                </div>
              </li>
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
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-card border border-border text-foreground hover:bg-gradient-brand hover:text-primary-foreground hover:border-transparent transition-colors"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-border shadow-soft">
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
            className="p-8 sm:p-10 rounded-3xl bg-card border border-border shadow-elegant"
            noValidate
          >
            <h3 className="text-2xl font-bold text-foreground">Envíanos un mensaje</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Completa el formulario y nuestro equipo se pondrá en contacto.
            </p>
            <div className="mt-6 grid gap-5">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" name="name" required maxLength={100} className="mt-2" placeholder="Tu nombre completo" />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input id="email" name="email" type="email" required maxLength={255} className="mt-2" placeholder="tu@correo.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" name="phone" type="tel" maxLength={30} className="mt-2" placeholder="+57 300 000 0000" />
                </div>
              </div>
              <div>
                <Label htmlFor="message">Mensaje</Label>
                <Textarea id="message" name="message" required minLength={10} maxLength={1000} rows={5} className="mt-2" placeholder="Cuéntanos en qué podemos ayudarte..." />
              </div>
              <Button type="submit" disabled={loading} size="lg" className="bg-gradient-brand text-primary-foreground hover:opacity-90 min-h-11">
                {loading ? "Enviando…" : (<>Enviar mensaje <Send className="ml-2 h-4 w-4" /></>)}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
