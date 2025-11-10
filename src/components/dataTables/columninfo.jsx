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

// ✅ Colonnes pour Information
export const columnsInformation = [
  { accessorKey: "Nom", header: "Nom" },
  { accessorKey: "Compagne", header: "Compagne" },
  { accessorKey: "Telephone", header: "Téléphone" },
  { accessorKey: "Commentaire", header: "Commentaire" },
  { accessorKey: "Date", header: "Date Enregistrement" },
  { accessorKey: "CreerPar", header: "Créé par" },

   {
    header: "Actions",
    cell: ({ row }) => {
      const nom = row?.original.nom
      return <CellAction nom={nom} />
    },
  },
 ]