import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AdminList, DialogFooterActions } from "@/components/admin/AdminList";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { upsertNews, deleteNews } from "@/lib/admin.functions";

type Row = {
  id: string;
  tag: string;
  published_date: string;
  title: string;
  excerpt: string;
  body: string | null;
  image_url: string | null;
  display_order: number;
  published: boolean;
};

const EMPTY: Row = {
  id: "",
  tag: "Noticia",
  published_date: new Date().toISOString().slice(0, 10),
  title: "",
  excerpt: "",
  body: "",
  image_url: null,
  display_order: 0,
  published: true,
};

export const Route = createFileRoute("/_authenticated/admin/news")({
  component: NewsAdmin,
});

function NewsAdmin() {
  return (
    <AdminList<Row>
      section="news"
      title="Noticias"
      description="Actualizaciones, eventos y convocatorias de la fundación."
      newButtonLabel="Nueva noticia"
      createDefaults={EMPTY}
      columns={[
        { header: "Título", cell: (r) => <span className="font-medium">{r.title}</span> },
        { header: "Etiqueta", cell: (r) => r.tag },
        { header: "Fecha", cell: (r) => r.published_date },
        { header: "Orden", cell: (r) => r.display_order, className: "w-16" },
        {
          header: "Estado",
          cell: (r) => (
            <span
              className={
                r.published
                  ? "text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                  : "text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
              }
            >
              {r.published ? "Publicado" : "Borrador"}
            </span>
          ),
          className: "w-24",
        },
      ]}
      onDelete={(id) => deleteNews({ data: { id } })}
      renderForm={({ initial, onDone }) => <NewsForm initial={initial!} onDone={onDone} />}
    />
  );
}

function NewsForm({ initial, onDone }: { initial: Row; onDone: () => void }) {
  const qc = useQueryClient();
  const [form, setForm] = useState<Row>(initial);
  const [saving, setSaving] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await upsertNews({
        data: {
          ...(form.id ? { id: form.id } : {}),
          tag: form.tag.trim(),
          published_date: form.published_date,
          title: form.title.trim(),
          excerpt: form.excerpt.trim(),
          body: form.body?.trim() || null,
          image_url: form.image_url ?? null,
          display_order: Number(form.display_order) || 0,
          published: form.published,
        },
      });
      await qc.invalidateQueries({ queryKey: ["admin", "content"] });
      toast.success("Noticia guardada.");
      onDone();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2 space-y-1.5">
          <Label>Título *</Label>
          <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        </div>
        <div className="space-y-1.5">
          <Label>Etiqueta *</Label>
          <Input value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} required />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label>Resumen *</Label>
        <Textarea
          rows={2}
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          required
        />
      </div>
      <div className="space-y-1.5">
        <Label>Contenido completo (opcional)</Label>
        <Textarea
          rows={6}
          value={form.body ?? ""}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
        />
      </div>
      <div className="space-y-1.5">
        <Label>Imagen</Label>
        <ImageUploader value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label>Fecha *</Label>
          <Input
            type="date"
            value={form.published_date}
            onChange={(e) => setForm({ ...form, published_date: e.target.value })}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label>Orden</Label>
          <Input
            type="number"
            value={form.display_order}
            onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })}
          />
        </div>
        <div className="flex items-center gap-3 pt-6">
          <Switch
            id="pub"
            checked={form.published}
            onCheckedChange={(v) => setForm({ ...form, published: v })}
          />
          <Label htmlFor="pub">Publicada</Label>
        </div>
      </div>
      <DialogFooterActions onCancel={onDone} saving={saving} />
    </form>
  );
}
