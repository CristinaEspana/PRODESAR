import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AdminList, DialogFooterActions } from "@/components/admin/AdminList";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { upsertPillar } from "@/lib/admin.functions";

type Row = {
  id: string;
  kind: string;
  title: string;
  description: string;
  display_order: number;
};

const EMPTY: Row = { id: "", kind: "ambiental", title: "", description: "", display_order: 0 };

export const Route = createFileRoute("/_authenticated/admin/pillars")({
  component: PillarsAdmin,
});

function PillarsAdmin() {
  return (
    <AdminList<Row>
      section="pillars"
      title="Pilares"
      description="Los tres pilares del desarrollo sostenible. Cada tipo determina la imagen y el ícono en el sitio."
      newButtonLabel="Nuevo pilar"
      createDefaults={EMPTY}
      columns={[
        { header: "Título", cell: (r) => <span className="font-medium">{r.title}</span> },
        { header: "Tipo", cell: (r) => <code className="text-xs">{r.kind}</code> },
        { header: "Orden", cell: (r) => r.display_order, className: "w-16" },
      ]}
      // pillars aren't deletable (only three) — but keep API for consistency; wire noop
      onDelete={async () => {
        toast.error("Los pilares no se pueden eliminar, solo editar.");
      }}
      renderForm={({ initial, onDone }) => <PillarForm initial={initial!} onDone={onDone} />}
    />
  );
}

function PillarForm({ initial, onDone }: { initial: Row; onDone: () => void }) {
  const qc = useQueryClient();
  const [form, setForm] = useState<Row>(initial);
  const [saving, setSaving] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await upsertPillar({
        data: {
          ...(form.id ? { id: form.id } : {}),
          kind: form.kind,
          title: form.title.trim(),
          description: form.description.trim(),
          display_order: Number(form.display_order) || 0,
        },
      });
      await qc.invalidateQueries({ queryKey: ["admin", "content"] });
      toast.success("Pilar guardado.");
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
        <div className="space-y-1.5">
          <Label>Título *</Label>
          <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        </div>
        <div className="space-y-1.5">
          <Label>Tipo *</Label>
          <Select value={form.kind} onValueChange={(v) => setForm({ ...form, kind: v })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ambiental">Ambiental</SelectItem>
              <SelectItem value="economico">Económico</SelectItem>
              <SelectItem value="social">Social</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-1.5">
        <Label>Descripción *</Label>
        <Textarea
          rows={4}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
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
      <DialogFooterActions onCancel={onDone} saving={saving} />
    </form>
  );
}
