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
  export const columnDPCR = [
      { accessorKey: "idAppel", header: "ID Appel" },
      { accessorKey: "usager", header: "Usager" },
      { accessorKey: "plaignant", header: "Plaignant" },
      { accessorKey: "contact", header: "Contact" },
      { accessorKey: "typeRequete", header: "Type de requête" },
      { accessorKey: "description", header: "Description" },
      { accessorKey: "region", header: "Région" },
      { accessorKey: "ville", header: "Ville" },
      { accessorKey: "route", header: "Route" },
      { accessorKey: "date", header: "Date" },
      { accessorKey: "gravite", header: "Gravité" },
      { accessorKey: "piecesJointes", header: "Pièces jointes" },
    
    
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const nom = row?.original.nom
      return <CellAction nom={nom} />
    },
  },
]
