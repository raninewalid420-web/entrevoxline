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
export const EABcolumns = [
    { accessorKey: "nom", header: "Nom" },
    { accessorKey: "telephone", header: "Téléphone" },
    { accessorKey: "services", header: "Services" },
    { accessorKey: "plainte", header: "Plainte" },
    { accessorKey: "reponse", header: "Réponse fourni" },
    { accessorKey: "compte", header: "Compte" },
    { accessorKey: "enregistrePar", header: "Enregistré par" },
 {
   
    header: "Actions",
    cell: ({ row }) => {
      const nom = row?.original.nom
      return <CellAction nom={nom} />
    },
  },
 ]