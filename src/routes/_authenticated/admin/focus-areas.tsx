import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AdminList, DialogFooterActions } from "@/components/admin/AdminList";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { upsertFocusArea, deleteFocusArea } from "@/lib/admin.functions";
import { AVAILABLE_ICON_NAMES } from "@/components/site/Areas";

type Row = {
  id: string;
  icon_name: string;
  title: string;
  description: string;
  display_order: number;
};

const EMPTY: Row = { id: "", icon_name: "Users", title: "", description: "", display_order: 0 };

export const Route = createFileRoute("/_authenticated/admin/focus-areas")({
  component: FocusAdmin,
});

function FocusAdmin() {
  return (
    <AdminList<Row>
      section="focus"
      title="Áreas de acción"
      description="Los seis ejes que estructuran el trabajo de la fundación."
      newButtonLabel="Nueva área"
      createDefaults={EMPTY}
      columns={[
        { header: "Título", cell: (r) => <span className="font-medium">{r.title}</span> },
        { header: "Ícono", cell: (r) => <code className="text-xs">{r.icon_name}</code> },
        { header: "Orden", cell: (r) => r.display_order, className: "w-16" },
      ]}
      onDelete={(id) => deleteFocusArea({ data: { id } })}
      renderForm={({ initial, onDone }) => <FocusForm initial={initial!} onDone={onDone} />}
    />
  );
}

function FocusForm({ initial, onDone }: { initial: Row; onDone: () => void }) {
  const qc = useQueryClient();
  const [form, setForm] = useState<Row>(initial);
  const [saving, setSaving] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await upsertFocusArea({
        data: {
          ...(form.id ? { id: form.id } : {}),
          icon_name: form.icon_name,
          title: form.title.trim(),
          description: form.description.trim(),
          display_order: Number(form.display_order) || 0,
        },
      });
      await qc.invalidateQueries({ queryKey: ["admin", "content"] });
      toast.success("Área guardada.");
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
          <Label>Ícono</Label>
          <Select value={form.icon_name} onValueChange={(v) => setForm({ ...form, icon_name: v })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {AVAILABLE_ICON_NAMES.map((n) => (
                <SelectItem key={n} value={n}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-1.5">
        <Label>Descripción *</Label>
        <Textarea
          rows={3}
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
