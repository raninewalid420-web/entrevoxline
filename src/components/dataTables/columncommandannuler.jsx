import { X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

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
export const columnsCommandAnnuler = [
  {
    accessorKey: "nom",
    header: "Nom",
  },
  {
    accessorKey: "telephone",
    header: "Telephone",
  },
  {
    accessorKey: "Commande",
    header: "Numero de la commande",
  },
  {
    accessorKey: "dateCommande",
    header: "Date de la commande",
  },
  {
    accessorKey: "raison",
    header: "Raison",
  },
  {
    accessorKey: "dateEnregistrement",
    header: "Date Enregistrement",
  },
  {
    accessorKey: "creePar",
    header: "Creer par",
  },
   {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const nom = row?.original.nom
      return <CellAction nom={nom} />
    },
  },
];

