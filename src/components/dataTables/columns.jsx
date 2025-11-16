import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

// ✅ Composant d’action (boîte de confirmation)
const CellAction = ({ nom }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <X className="w-4 h-4 text-red-500 hover:text-red-700 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Supprimer {nom} ?</DialogTitle>
          <DialogDescription>
            Cette action est irréversible. Êtes-vous sûr de vouloir supprimer ce
            colis ?
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

// ✅ Colonnes du tableau
export const columns = [
  { accessorKey: "Nom", header: "Nom" },
  { accessorKey: "Telephone", header: "Téléphone" },
  { accessorKey: "commande", header: "Commande" },
  {
    accessorKey: "Reference",
    header: "Référence",
    cell: ({ row }) => (
      <div className="min-w-[500px] max-w-[700px] whitespace-pre-wrap">
        {row.original.Reference}
      </div>
    ),
  },
  { accessorKey: "Date_Expedition", header: "Date Expédition" },
  { accessorKey: "Date_Reception_Poste", header: "Date Réception Poste" },
  { accessorKey: "Date_Reception_client", header: "Date Réception Client" },
  { accessorKey: "Status", header: "Status" },
  { accessorKey: "Date_Enregistrement", header: "Date Enregistrement" },
  { accessorKey: "nom_user", header: "Enregistré par" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const nom = row?.original.nom;
      return <CellAction nom={nom} />;
    },
  },
];
