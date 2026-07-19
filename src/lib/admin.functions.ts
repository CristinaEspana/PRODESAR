import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

async function ensureAdmin(ctx: { supabase: any; userId: string }) {
  const { data, error } = await ctx.supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", ctx.userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin role required");
}

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    return { isAdmin: !!data, userId: context.userId };
  });

// Projects
const projectSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1).max(200),
  location: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  objective: z.string().min(1).max(500),
  results: z.string().min(1).max(500),
  image_url: z.string().url().nullable().optional(),
  display_order: z.number().int().default(0),
  published: z.boolean().default(true),
});

export const upsertProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => projectSchema.parse(d))
  .handler(async ({ data, context }) => {
    await ensureAdmin(context);
    const { error } = await context.supabase.from("projects").upsert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await ensureAdmin(context);
    const { error } = await context.supabase.from("projects").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// News
const newsSchema = z.object({
  id: z.string().uuid().optional(),
  tag: z.string().min(1).max(50),
  published_date: z.string().min(1),
  title: z.string().min(1).max(300),
  excerpt: z.string().min(1).max(1000),
  body: z.string().max(20000).nullable().optional(),
  image_url: z.string().url().nullable().optional(),
  display_order: z.number().int().default(0),
  published: z.boolean().default(true),
});

export const upsertNews = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => newsSchema.parse(d))
  .handler(async ({ data, context }) => {
    await ensureAdmin(context);
    const { error } = await context.supabase.from("news").upsert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteNews = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await ensureAdmin(context);
    const { error } = await context.supabase.from("news").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// Impact
const impactSchema = z.object({
  id: z.string().uuid().optional(),
  label: z.string().min(1).max(200),
  value: z.number().int().min(0),
  suffix: z.string().max(10).default(""),
  display_order: z.number().int().default(0),
});

export const upsertImpact = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => impactSchema.parse(d))
  .handler(async ({ data, context }) => {
    await ensureAdmin(context);
    const { error } = await context.supabase.from("impact_counters").upsert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteImpact = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await ensureAdmin(context);
    const { error } = await context.supabase.from("impact_counters").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// Focus areas
const focusSchema = z.object({
  id: z.string().uuid().optional(),
  icon_name: z.string().min(1).max(60),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(1000),
  display_order: z.number().int().default(0),
});

export const upsertFocusArea = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => focusSchema.parse(d))
  .handler(async ({ data, context }) => {
    await ensureAdmin(context);
    const { error } = await context.supabase.from("focus_areas").upsert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteFocusArea = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await ensureAdmin(context);
    const { error } = await context.supabase.from("focus_areas").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// Pillars
const pillarSchema = z.object({
  id: z.string().uuid().optional(),
  kind: z.string().min(1).max(40),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(1000),
  display_order: z.number().int().default(0),
});

export const upsertPillar = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => pillarSchema.parse(d))
  .handler(async ({ data, context }) => {
    await ensureAdmin(context);
    const { error } = await context.supabase.from("pillars").upsert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// List all rows (admin view — sees drafts too)
export const listAdminContent = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await ensureAdmin(context);
    const [projects, news, impact, focus, pillars] = await Promise.all([
      context.supabase.from("projects").select("*").order("display_order"),
      context.supabase.from("news").select("*").order("display_order"),
      context.supabase.from("impact_counters").select("*").order("display_order"),
      context.supabase.from("focus_areas").select("*").order("display_order"),
      context.supabase.from("pillars").select("*").order("display_order"),
    ]);
    return {
      projects: projects.data ?? [],
      news: news.data ?? [],
      impact: impact.data ?? [],
      focus: focus.data ?? [],
      pillars: pillars.data ?? [],
    };
  });
