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

// colonnes purcsa//
export const columnPurcsa = [
  { header: "Numéro plainte", accessorKey: "numeroPlainte" },
  { header: "Date saisi", accessorKey: "dateSaisi" },
  { header: "Nom", accessorKey: "nom" },
  { header: "Nom conjointe(e)", accessorKey: "nomConjointe" },
  { header: "Téléphone", accessorKey: "telephone" },
  { header: "Date Naissance", accessorKey: "dateNaissance" },
  { header: "CIN", accessorKey: "cin" },
  { header: "Genre", accessorKey: "genre" },
  { header: "Région", accessorKey: "region" },
  { header: "Localité", accessorKey: "localite" },
  { header: "Description plainte", accessorKey: "descriptionPlainte" },
  { header: "Nom deleguer", accessorKey: "nomDeleguer" },
  { header: "Date de depot", accessorKey: "dateDepot" },
  { header: "Date resolution CL", accessorKey: "dateResolutionCL" },
  { header: "Resolution commite local", accessorKey: "resolutionCL" },
  { header: "Categorie", accessorKey: "categorie" },
  { header: "Plainte", accessorKey: "plainte" },
  { header: "Sous type ouvrage", accessorKey: "sousTypeOuvrage" },
  { header: "Satisfaction", accessorKey: "satisfaction" },
  { header: "Status de plainte", accessorKey: "statusPlainte" },
  { header: "Créé par", accessorKey: "creePar" },
  { header: "Actions", accessorKey: "actions" },

   {
    header: "Actions",
    cell: ({ row }) => {
      const nom = row?.original.nom
      return <CellAction nom={nom} />
    },
  },
 ]