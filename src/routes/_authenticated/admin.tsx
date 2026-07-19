import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Folder,
  Newspaper,
  BarChart3,
  Grid3x3,
  Columns3,
  LogOut,
  Home,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { checkIsAdmin } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Panel de administración — PRODESAR" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean };
const nav: NavItem[] = [
  { to: "/admin", label: "Inicio", icon: LayoutDashboard, exact: true },
  { to: "/admin/projects", label: "Proyectos", icon: Folder },
  { to: "/admin/news", label: "Noticias", icon: Newspaper },
  { to: "/admin/impact", label: "Impacto", icon: BarChart3 },
  { to: "/admin/focus-areas", label: "Áreas de acción", icon: Grid3x3 },
  { to: "/admin/pillars", label: "Pilares", icon: Columns3 },
];

function AdminLayout() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const { data, isLoading } = useQuery({
    queryKey: ["is-admin"],
    queryFn: () => checkIsAdmin(),
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Cargando…
      </div>
    );
  }

  if (!data?.isAdmin) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4">
        <Toaster richColors position="top-right" />
        <div className="max-w-md text-center bg-card border border-border rounded-2xl p-8 shadow-soft">
          <h1 className="text-2xl font-bold text-foreground">Acceso restringido</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Tu cuenta ({email ?? "—"}) está autenticada pero aún no tiene rol de
            administrador. Solicita al equipo de PRODESAR que te otorgue permisos.
          </p>
          <div className="mt-6 flex gap-2 justify-center">
            <Button asChild variant="outline">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Ir al sitio
              </Link>
            </Button>
            <Button onClick={signOut} variant="ghost">
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Toaster richColors position="top-right" />
      <div className="flex">
        <aside className="w-64 bg-card border-r border-border min-h-screen sticky top-0 hidden md:flex flex-col">
          <div className="p-6 border-b border-border">
            <Link to="/" className="font-bold text-lg text-gradient-brand">
              PRODESAR
            </Link>
            <p className="text-xs text-muted-foreground mt-1">Panel de administración</p>
          </div>
          <nav className="p-3 space-y-1 flex-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.exact ?? false }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-accent transition-colors"
                activeProps={{ className: "bg-accent font-semibold text-primary" }}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="p-3 border-t border-border">
            <p className="text-xs text-muted-foreground px-2 pb-2 truncate">{email}</p>
            <Button onClick={signOut} variant="ghost" className="w-full justify-start" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar sesión
            </Button>
          </div>
        </aside>
        <main className="flex-1 min-w-0">
          <div className="md:hidden bg-card border-b border-border p-3 flex gap-1 overflow-x-auto">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.exact ?? false }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs whitespace-nowrap"
                activeProps={{ className: "bg-accent font-semibold text-primary" }}
              >
                <n.icon className="h-3.5 w-3.5" />
                {n.label}
              </Link>
            ))}
          </div>
          <div className="p-6 md:p-10 max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export { toast };
