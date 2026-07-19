import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AdminList, DialogFooterActions } from "@/components/admin/AdminList";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { upsertImpact, deleteImpact } from "@/lib/admin.functions";

type Row = {
  id: string;
  label: string;
  value: number;
  suffix: string;
  display_order: number;
};

const EMPTY: Row = { id: "", label: "", value: 0, suffix: "", display_order: 0 };

export const Route = createFileRoute("/_authenticated/admin/impact")({
  component: ImpactAdmin,
});

function ImpactAdmin() {
  return (
    <AdminList<Row>
      section="impact"
      title="Contadores de impacto"
      description="Cifras destacadas en la sección de impacto."
      newButtonLabel="Nuevo contador"
      createDefaults={EMPTY}
      columns={[
        { header: "Etiqueta", cell: (r) => <span className="font-medium">{r.label}</span> },
        {
          header: "Valor",
          cell: (r) => `${Number(r.value).toLocaleString("es-CO")}${r.suffix}`,
        },
        { header: "Orden", cell: (r) => r.display_order, className: "w-16" },
      ]}
      onDelete={(id) => deleteImpact({ data: { id } })}
      renderForm={({ initial, onDone }) => <ImpactForm initial={initial!} onDone={onDone} />}
    />
  );
}

function ImpactForm({ initial, onDone }: { initial: Row; onDone: () => void }) {
  const qc = useQueryClient();
  const [form, setForm] = useState<Row>({ ...initial, value: Number(initial.value) });
  const [saving, setSaving] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await upsertImpact({
        data: {
          ...(form.id ? { id: form.id } : {}),
          label: form.label.trim(),
          value: Number(form.value) || 0,
          suffix: form.suffix,
          display_order: Number(form.display_order) || 0,
        },
      });
      await qc.invalidateQueries({ queryKey: ["admin", "content"] });
      toast.success("Contador guardado.");
      onDone();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="space-y-1.5">
        <Label>Etiqueta *</Label>
        <Input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} required />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1.5 col-span-2">
          <Label>Valor *</Label>
          <Input
            type="number"
            value={form.value}
            onChange={(e) => setForm({ ...form, value: Number(e.target.value) })}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label>Sufijo</Label>
          <Input
            value={form.suffix}
            onChange={(e) => setForm({ ...form, suffix: e.target.value })}
            placeholder="+ %"
            maxLength={5}
          />
        </div>
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
