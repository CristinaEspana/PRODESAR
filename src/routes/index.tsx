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

export const Route = createFileRoute("/")({
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
  component: Index,
});

function Index() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Pillars />
        <Areas />
        <Projects />
        <Impact />
        <Allies />
        <News />
        <Donate />
        <Contact />
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
    </>
  );
}
