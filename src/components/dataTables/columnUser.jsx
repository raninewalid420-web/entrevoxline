import { X, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { useState } from "react";

// Component d'action : Update + Delete
const CellAction = ({ user }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
  });

  const handleUpdate = () => {
    // 👉 Tu mets ici ton API Update
    console.log("Updating user:", user.id, form);
    setOpenEdit(false);
  };

  const handleDelete = () => {
    // 👉 Tu mets ici ton API Delete
    console.log("Deleting user:", user.id);
    setOpenDelete(false);
  };

  return (
    <div className="flex items-center gap-3">
      {/* ---- Bouton Modifier ---- */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogTrigger asChild>
          <Pencil className="w-4 h-4 text-blue-500 cursor-pointer hover:text-blue-700" />
        </DialogTrigger>

        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Modifier {user.name}</DialogTitle>
            <DialogDescription>
              Met à jour les informations de l’utilisateur.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-3">
            <div>
              <label className="block text-sm font-medium">Nom</label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <Input
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setOpenEdit(false)}>
                Annuler
              </Button>
              <Button onClick={handleUpdate}>Enregistrer</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ---- Bouton Supprimer ---- */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogTrigger asChild>
          <X className="w-4 h-4 text-red-500 cursor-pointer hover:text-red-700" />
        </DialogTrigger>

        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Supprimer {user.name} ?</DialogTitle>
            <DialogDescription>
              Cette action est irréversible. Voulez-vous continuer ?
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-3 mt-5">
            <Button variant="outline" onClick={() => setOpenDelete(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Supprimer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// ================================
// Colonnes améliorées
// ================================
export const columnUser = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    header: "Nom",
  },

  {
    accessorKey: "email",
    header: "Email",
  },

  {
    header: "Actions",
    cell: ({ row }) => <CellAction user={row.original} />,
  },
];
