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
export const columnscrec = [
{ header: "Numéro plainte", accessorKey: "numeroPlainte" },
{ header: "Date saisi", accessorKey: "dateSaisi" },
{ header: "Nom", accessorKey: "nom" },
{ header: "Nom conjointe (e)", accessorKey: "nomConjoint" },
{ header: "Téléphone", accessorKey: "telephone" },
{ header: "Date Naissance", accessorKey: "dateNaissance" },
{ header: "CIN", accessorKey: "cin" },
{ header: "Genre", accessorKey: "genre" },
{ header: "Région", accessorKey: "region" },
{ header: "localité", accessorKey: "localite" },
{ header: "Description plainte", accessorKey: "descriptionPlainte" },
{ header: "Information", accessorKey: "information" },
{ header: "Nom deleguer", accessorKey: "nomDeleguer" },
{ header: "Type de plainte", accessorKey: "typePlainte" },
{ header: "Type de Probleme", accessorKey: "typeProbleme" },
{ header: "Créé par", accessorKey: "creePar" },

   {
    header: "Actions",
    cell: ({ row }) => {
      const nom = row?.original.nom
      return <CellAction nom={nom} />
    },
  },
 ]