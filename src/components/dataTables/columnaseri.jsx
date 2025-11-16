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
export const columnsaseri = [
  { header: "Numéro plainte", accessorKey: "numero" },
  { header: "Date saisi", accessorKey: "date" },
  { header: "Nom", accessorKey: "nom" },
  { header: "Nom conjointe (e)", accessorKey: "Nomconjointe" },
  { header: "Téléphone", accessorKey: "telephone" },
  { header: "Numero Etdiant universitaire", accessorKey: "numEtudiant" },
  { header: "Date Naissance", accessorKey: "Date_naissance" },
  { header: "CIN", accessorKey: "cin" },
  {
    header: "Genre",
    accessorKey: "genre",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          row.original.genre === "Femme"
            ? "bg-blue-100 text-blue-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {row.original.genre}
      </span>
    ),
  },
  { header: "Région", accessorKey: "region" },
  { header: "commune", accessorKey: "commune" },
  { header: "Quartier", accessorKey: "quartier" },
  {
    header: "Description plainte",
    accessorKey: "description",
    cell: ({ row }) => (
      <div className="min-w-[500px] max-w-[700px] whitespace-pre-wrap">
        {row.original.description}
      </div>
    ),
  },
  {
    header: "category plainte",
    accessorKey: "category_plainte",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          row.original.category_plainte === "doleance"
            ? "bg-purple-100 text-purple-700"
            : "bg-orange-100 text-orange-700"
        }`}
      >
        {row.original.category_plainte}
      </span>
    ),
  },
  { header: "TypeProbleme", accessorKey: "TypeProbleme" },
  
  // {
  //   header: "Actions",
  //   cell: ({ row }) => {
  //     const nom = row?.original.nom;
  //     return <CellAction nom={nom} />;
  //   },
  // },
];
