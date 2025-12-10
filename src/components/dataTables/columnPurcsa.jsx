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
const CellAction = ({ nom,id,description,information }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <X className="w-4 h-4 text-red-500 hover:text-red-700 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Supprimer {nom} do'ou l'id = {id} ?</DialogTitle>
          <DialogDescription>
           dezscription: {description} <br /> <br />
            information: {information}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

// colonnes purcsa//
export const columnPurcsa = [
  { header: "Numéro plainte", accessorKey: "numero" },
  { header: "Date saisi", accessorKey: "date" },
  { header: "Nom", accessorKey: "nom" },
  { header: "Nom conjointe(e)", accessorKey: "Nomconjointe" },
  { header: "Téléphone", accessorKey: "telephone" },
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
  { header: "Localité", accessorKey: "localite" },
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
    header: "Information",
    accessorKey: "information",
    cell: ({ row }) => (
      <div className="min-w-[500px] max-w-[700px] whitespace-pre-wrap">
        {row.original.information}
      </div>
    ),
  },
  { header: "Nom deleguer", accessorKey: "nomdeleguer" },
  { header: "Date de depot", accessorKey: "date_depot" },
  { header: "Date resolution CL", accessorKey: "date_resolution" },
  {
    header: "Resolution commite local",
    accessorKey: "Resolution_comite_local",
    cell: ({ row }) => (
      <div className="min-w-[250px] max-w-[350px] truncate">
        {row.original.Resolution_comite_local}
      </div>
    ),
  },
  {
    header: "Categorie",
    accessorKey: "categorie",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          row.original.categorie === "solvable"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {row.original.categorie}
      </span>
    ),
  },
  {
    header: "Plainte",
    accessorKey: "type_plainte",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          row.original.type_plainte === "Ouvrage"
            ? "bg-purple-100 text-purple-700"
            : "bg-orange-100 text-orange-700"
        }`}
      >
        {row.original.type_plainte}
      </span>
    ),
  },
  {
    header: "Satisfaction",
    accessorKey: "Satisfaction",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          row.original.Satisfaction === "Oui"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {row.original.Satisfaction}
      </span>
    ),
  },
  {
    header: "Status de plainte",
    accessorKey: "Status_de_plainte",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          row.original.Status_de_plainte === "Fermé"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {row.original.Status_de_plainte}
      </span>
    ),
  },
  { header: "Creer par ", accessorKey: "agent" },

  {
    header: "Actions",
    cell: ({ row }) => {
      const nom = row?.original.nom;
      const id = row?.original.id;
      const description = row?.original.description;
      const information = row?.original.information;
      return <CellAction nom={nom} id={id} description={description} information={information} />;
    },
  },
];
