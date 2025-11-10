import { X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

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
            Cette action est irréversible. Êtes-vous sûr de vouloir supprimer ce colis ?
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

// ✅ Colonnes du tableau
export const Aruloscolumns = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "nom", header: "Nom" },
  { accessorKey: "telephone", header: "Numéro de Téléphone" },
  { accessorKey: "logement", header: "Numéro de Logement" },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "projet", header: "Nom du Projet" },
  { accessorKey: "quartier", header: "Quartier" },
  { accessorKey: "equipement", header: "Équipement" },
  { accessorKey: "affectation", header: "Type d'affectation" },
  { accessorKey: "commentaire", header: "Commentaire" },
  { accessorKey: "facture", header: "Numéro de Facture" },
  { accessorKey: "enregistrePar", header: "Enregistré par" },
  { accessorKey: "dateCreation", header: "Date de Création" },
  { accessorKey: "chefDeChantier", header: "Nom du Chef de Chantier" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const nom = row?.original.nom
      return <CellAction nom={nom} />
    },
  },
]
