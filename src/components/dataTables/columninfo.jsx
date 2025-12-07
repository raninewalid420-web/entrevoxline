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

// ✅ Colonnes pour Information
export const columnsInformation = [
  { accessorKey: "nom", header: "Nom" },
  { accessorKey: "type", header: "Compagne" },
  { accessorKey: "telephone", header: "Téléphone" },
  {
    accessorKey: "commentaire",
    header: "Commentaire",
    cell: ({ row }) => (
      <div className="min-w-[500px] max-w-[700px] whitespace-pre-wrap">
        {row.original.commentaire}
      </div>
    ),
  },
  { accessorKey: "created_at", header: "Date Enregistrement" },
  { accessorKey: "agent", header: "Créé par" },

  // {
  //   header: "Actions",
  //   cell: ({ row }) => {
  //     const nom = row?.original.nom;
  //     return <CellAction nom={nom} />;
  //   },
  // },
];
