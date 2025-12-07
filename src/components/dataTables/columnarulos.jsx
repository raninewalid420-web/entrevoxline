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
export const Aruloscolumns = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "nom", header: "Nom" },
  { accessorKey: "numero_telephone", header: "Numéro de Téléphone" },
  { accessorKey: "numero_logement", header: "Numéro de Logement" },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "nom_projet", header: "Nom du Projet" },
  { accessorKey: "quartier", header: "Quartier" },
  { accessorKey: "equipement", header: "Équipement" },
  { accessorKey: "affecterTotal", header: "Type d'affectation" },
  {
    accessorKey: "commentaire",
    header: "Commentaire",
    cell: ({ row }) => (
      <div className="min-w-[500px] max-w-[700px] whitespace-pre-wrap">
        {row.original.commentaire}
      </div>
    ),
  },
  { accessorKey: "numero_facture", header: "Numéro de Facture" },
  { accessorKey: "agent", header: "Enregistré par" },
  { accessorKey: "created_at", header: "Date de Création" },
  { accessorKey: "nomChefChantier", header: "Nom du Chef de Chantier" },
  // {
  //   id: "actions",
  //   header: "Actions",
  //   cell: ({ row }) => {
  //     const nom = row?.original.nom;
  //     return <CellAction nom={nom} />;
  //   },
  // },
];
