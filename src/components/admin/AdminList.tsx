import { useState, type ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { listAdminContent } from "@/lib/admin.functions";

export type AdminSection = "projects" | "news" | "impact" | "focus" | "pillars";

export function AdminList<T extends { id: string }>({
  section,
  title,
  description,
  columns,
  renderForm,
  onDelete,
  createDefaults,
  newButtonLabel = "Nuevo",
}: {
  section: AdminSection;
  title: string;
  description?: string;
  columns: { header: string; cell: (row: T) => ReactNode; className?: string }[];
  renderForm: (props: { initial: T | null; onDone: () => void }) => ReactNode;
  onDelete: (id: string) => Promise<unknown>;
  createDefaults: T;
  newButtonLabel?: string;
}) {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "content"],
    queryFn: () => listAdminContent(),
  });
  const rows = (data?.[section] ?? []) as T[];

  const [editing, setEditing] = useState<T | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<T | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirmDelete) return;
    setDeleting(true);
    try {
      await onDelete(confirmDelete.id);
      await qc.invalidateQueries({ queryKey: ["admin", "content"] });
      toast.success("Eliminado.");
      setConfirmDelete(null);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error al eliminar");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          {description && <p className="mt-2 text-muted-foreground">{description}</p>}
        </div>
        <Button
          onClick={() => {
            setEditing(createDefaults);
            setDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          {newButtonLabel}
        </Button>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">
            <Loader2 className="mx-auto h-5 w-5 animate-spin" />
          </div>
        ) : rows.length === 0 ? (
          <div className="p-10 text-center text-sm text-muted-foreground">
            Aún no hay registros. Crea el primero.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
                <tr>
                  {columns.map((c) => (
                    <th key={c.header} className={`px-4 py-3 font-semibold ${c.className ?? ""}`}>
                      {c.header}
                    </th>
                  ))}
                  <th className="px-4 py-3 w-24"></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-t border-border">
                    {columns.map((c, i) => (
                      <td key={i} className={`px-4 py-3 align-top ${c.className ?? ""}`}>
                        {c.cell(row)}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => {
                            setEditing(row);
                            setDialogOpen(true);
                          }}
                          aria-label="Editar"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setConfirmDelete(row)}
                          aria-label="Eliminar"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Dialog
        open={dialogOpen}
        onOpenChange={(o) => {
          setDialogOpen(o);
          if (!o) setEditing(null);
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editing && "id" in editing && (editing as T & { id: string }).id
                ? "Editar registro"
                : "Nuevo registro"}
            </DialogTitle>
          </DialogHeader>
          {editing &&
            renderForm({
              initial: editing,
              onDone: () => {
                setDialogOpen(false);
                setEditing(null);
              },
            })}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar este registro?</AlertDialogTitle>
            <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleting}>
              {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export function DialogFooterActions({
  onCancel,
  saving,
}: {
  onCancel: () => void;
  saving: boolean;
}) {
  return (
    <DialogFooter className="mt-6">
      <Button type="button" variant="outline" onClick={onCancel} disabled={saving}>
        Cancelar
      </Button>
      <Button type="submit" disabled={saving}>
        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Guardar
      </Button>
    </DialogFooter>
  );
}
