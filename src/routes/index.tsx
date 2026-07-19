import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Pillars } from "@/components/site/Pillars";
import { Areas } from "@/components/site/Areas";
import { Projects } from "@/components/site/Projects";
import { Impact } from "@/components/site/Impact";
import { Allies } from "@/components/site/Allies";
import { News } from "@/components/site/News";
import { Donate } from "@/components/site/Donate";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";
import { getPublicContent } from "@/lib/public-content.functions";

export const Route = createFileRoute("/")({
  loader: () => getPublicContent(),
  head: () => ({
    meta: [
      { title: "PRODESAR — Fundación Proyectos y Desarrollo" },
      {
        name: "description",
        content:
          "PRODESAR transforma ideas en desarrollo sostenible. Proyectos con impacto social, ambiental y económico para las comunidades.",
      },
      { property: "og:title", content: "PRODESAR — Fundación Proyectos y Desarrollo" },
      {
        property: "og:description",
        content:
          "Transformando ideas en desarrollo sostenible. Proyectos sociales, ambientales y económicos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center p-8 text-center">
      <div>
        <h1 className="text-2xl font-bold">No pudimos cargar el sitio</h1>
        <p className="mt-2 text-muted-foreground">{error.message}</p>
      </div>
    </div>
  ),
  notFoundComponent: () => <div className="p-8">Página no encontrada.</div>,
  component: Index,
});

function Index() {
  const content = Route.useLoaderData();
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Pillars items={content.pillars} />
        <Areas items={content.focusAreas} />
        <Projects items={content.projects} />
        <Impact items={content.impact} />
        <Allies />
        <News items={content.news} />
        <Donate />
        <Contact />
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
    </>
  );
}
