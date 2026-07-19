import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { listAdminContent } from "@/lib/admin.functions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Folder, Newspaper, BarChart3, Grid3x3, Columns3 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminHome,
});

function AdminHome() {
  const { data } = useQuery({
    queryKey: ["admin", "content"],
    queryFn: () => listAdminContent(),
  });

  const cards = [
    { to: "/admin/projects", label: "Proyectos", icon: Folder, count: data?.projects.length ?? 0 },
    { to: "/admin/news", label: "Noticias", icon: Newspaper, count: data?.news.length ?? 0 },
    { to: "/admin/impact", label: "Impacto", icon: BarChart3, count: data?.impact.length ?? 0 },
    { to: "/admin/focus-areas", label: "Áreas", icon: Grid3x3, count: data?.focus.length ?? 0 },
    { to: "/admin/pillars", label: "Pilares", icon: Columns3, count: data?.pillars.length ?? 0 },
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Bienvenido al panel</h1>
        <p className="mt-2 text-muted-foreground">
          Gestiona el contenido que aparece en el sitio público de PRODESAR.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link key={c.to} to={c.to}>
            <Card className="hover:shadow-elegant transition-shadow cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{c.label}</CardTitle>
                <c.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{c.count}</div>
                <p className="text-xs text-muted-foreground">registros publicados</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
