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
import { upsertProject, deleteProject } from "@/lib/admin.functions";

type Row = {
  id: string;
  name: string;
  location: string;
  description: string;
  objective: string;
  results: string;
  image_url: string | null;
  display_order: number;
  published: boolean;
};

const EMPTY: Row = {
  id: "",
  name: "",
  location: "",
  description: "",
  objective: "",
  results: "",
  image_url: null,
  display_order: 0,
  published: true,
};

export const Route = createFileRoute("/_authenticated/admin/projects")({
  component: ProjectsAdmin,
});

function ProjectsAdmin() {
  return (
    <AdminList<Row>
      section="projects"
      title="Proyectos"
      description="Portafolio de iniciativas mostradas en la página principal."
      newButtonLabel="Nuevo proyecto"
      createDefaults={EMPTY}
      columns={[
        { header: "Nombre", cell: (r) => <span className="font-medium">{r.name}</span> },
        { header: "Ubicación", cell: (r) => r.location },
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
      onDelete={(id) => deleteProject({ data: { id } })}
      renderForm={({ initial, onDone }) => <ProjectForm initial={initial!} onDone={onDone} />}
    />
  );
}

function ProjectForm({ initial, onDone }: { initial: Row; onDone: () => void }) {
  const qc = useQueryClient();
  const [form, setForm] = useState<Row>(initial);
  const [saving, setSaving] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...(form.id ? { id: form.id } : {}),
        name: form.name.trim(),
        location: form.location.trim(),
        description: form.description.trim(),
        objective: form.objective.trim(),
        results: form.results.trim(),
        image_url: form.image_url ?? null,
        display_order: Number(form.display_order) || 0,
        published: form.published,
      };
      await upsertProject({ data: payload });
      await qc.invalidateQueries({ queryKey: ["admin", "content"] });
      toast.success("Proyecto guardado.");
      onDone();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Nombre" required>
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </Field>
        <Field label="Ubicación" required>
          <Input
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />
        </Field>
      </div>
      <Field label="Descripción" required>
        <Textarea
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
      </Field>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Objetivo" required>
          <Textarea
            rows={2}
            value={form.objective}
            onChange={(e) => setForm({ ...form, objective: e.target.value })}
            required
          />
        </Field>
        <Field label="Resultados" required>
          <Textarea
            rows={2}
            value={form.results}
            onChange={(e) => setForm({ ...form, results: e.target.value })}
            required
          />
        </Field>
      </div>
      <Field label="Imagen">
        <ImageUploader value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} />
      </Field>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Orden de aparición">
          <Input
            type="number"
            value={form.display_order}
            onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })}
          />
        </Field>
        <div className="flex items-center gap-3 pt-6">
          <Switch
            checked={form.published}
            onCheckedChange={(v) => setForm({ ...form, published: v })}
            id="pub"
          />
          <Label htmlFor="pub">Publicado en el sitio</Label>
        </div>
      </div>
      <DialogFooterActions onCancel={onDone} saving={saving} />
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      {children}
    </div>
  );
}
