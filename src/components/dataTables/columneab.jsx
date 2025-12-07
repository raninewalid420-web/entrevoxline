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
export const EABcolumns = [
  { accessorKey: "nom_client", header: "Nom" },
  { accessorKey: "numero_telephone", header: "Téléphone" },
  { accessorKey: "services", header: "Services" },
  {
    accessorKey: "doléance",
    header: "Plainte",
    cell: ({ row }) => (
      <div className="min-w-[500px] max-w-[700px] whitespace-pre-wrap">
        {row.original.doléance}
      </div>
    ),
  },
  {
    accessorKey: "reponse_fourni",
    header: "Réponse fourni",
    cell: ({ row }) => (
      <div className="min-w-[500px] max-w-[700px] whitespace-pre-wrap">
        {row.original.reponse_fourni}
      </div>
    ),
  },
  { accessorKey: "nom_du_compte", header: "Compte" },
  { accessorKey: "date", header: "Date enregistrement" },
  { accessorKey: "agent", header: "Enregistré par" },
  // {
  //   header: "Actions",
  //   cell: ({ row }) => {
  //     const nom = row?.original.nom;
  //     return <CellAction nom={nom} />;
  //   },
  // },
];
