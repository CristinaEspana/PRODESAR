import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient<Database>(process.env.SUPABASE_URL!, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export type PublicProject = {
  id: string;
  name: string;
  location: string;
  description: string;
  objective: string;
  results: string;
  image_url: string | null;
  display_order: number;
};

export type PublicNews = {
  id: string;
  tag: string;
  published_date: string;
  title: string;
  excerpt: string;
  body: string | null;
  image_url: string | null;
  display_order: number;
};

export type PublicImpact = {
  id: string;
  label: string;
  value: number;
  suffix: string;
  display_order: number;
};

export type PublicFocusArea = {
  id: string;
  icon_name: string;
  title: string;
  description: string;
  display_order: number;
};

export type PublicPillar = {
  id: string;
  kind: string;
  title: string;
  description: string;
  display_order: number;
};

export type PublicContent = {
  projects: PublicProject[];
  news: PublicNews[];
  impact: PublicImpact[];
  focusAreas: PublicFocusArea[];
  pillars: PublicPillar[];
};

export const getPublicContent = createServerFn({ method: "GET" }).handler(
  async (): Promise<PublicContent> => {
    const sb = publicClient();
    const [projects, news, impact, focusAreas, pillars] = await Promise.all([
      sb
        .from("projects")
        .select("id, name, location, description, objective, results, image_url, display_order")
        .eq("published", true)
        .order("display_order", { ascending: true }),
      sb
        .from("news")
        .select("id, tag, published_date, title, excerpt, body, image_url, display_order")
        .eq("published", true)
        .order("display_order", { ascending: true }),
      sb
        .from("impact_counters")
        .select("id, label, value, suffix, display_order")
        .order("display_order", { ascending: true }),
      sb
        .from("focus_areas")
        .select("id, icon_name, title, description, display_order")
        .order("display_order", { ascending: true }),
      sb
        .from("pillars")
        .select("id, kind, title, description, display_order")
        .order("display_order", { ascending: true }),
    ]);
    return {
      projects: (projects.data ?? []) as PublicProject[],
      news: (news.data ?? []) as PublicNews[],
      impact: (impact.data ?? []).map((r) => ({ ...r, value: Number(r.value) })) as PublicImpact[],
      focusAreas: (focusAreas.data ?? []) as PublicFocusArea[],
      pillars: (pillars.data ?? []) as PublicPillar[],
    };
  },
);
