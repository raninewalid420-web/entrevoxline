// columns/columnsSensibles.jsx
import { X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const CellAction = ({ nom }) => (
  <Dialog>
    <DialogTrigger>
      <X className="w-4 h-4 text-red-500 hover:text-red-700 cursor-pointer" />
    </DialogTrigger>
    <DialogContent className="bg-white">
      <DialogHeader>
        <DialogTitle>Supprimer {nom} ?</DialogTitle>
        <DialogDescription>
          Cette action est irréversible. Êtes-vous sûr de vouloir supprimer ce cas sensible ?
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
)

export const columnsSensibles = [
  { header: "Nom", accessorKey: "nom" },
  { header: "Téléphone", accessorKey: "telephone" },
  { header: "Lieu", accessorKey: "lieu" },
  { header: "Type", accessorKey: "typeCas" },
  { header: "Responsable", accessorKey: "responsable" },
  { header: "Date", accessorKey: "date" },
  {
    header: "Description",
    accessorKey: "description",
    cell: ({ row }) => (
      <p
        className="max-w-[250px] h-20 resize-none border rounded-md p-2 text-sm bg-white text-wrap"
      >{row.original.description} </p>
    ),
  },
  {
    header: "Actions",
    cell: ({ row }) => <CellAction nom={row.original.nom} />,
  },
]
