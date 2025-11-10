import { ImageIcon, X } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"

import { Button } from "../ui/button";

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
export const columncartin = [
    { accessorKey: "nom", header: "Nom" },
    { accessorKey: "telephone", header: "Téléphone" },
    { accessorKey: "commande", header: "Numéro de commande" },
    { accessorKey: "commandeDate", header: "Commande de date" },
    { accessorKey: "inscrivezLe", header: "Inscrivez-le" },
    { accessorKey: "problemes", header: "Problèmes" },
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) =>
            row.original.image ? (
                <img
                    src={row.original.image}
                    alt="Image"
                    className="w-10 h-10 rounded-full object-cover"
                />
            ) : (
                <div className="text-sm text-gray-400 flex items-center gap-1">
                    <ImageIcon size={16} /> Aucune image
                </div>
            ),
    },
    { accessorKey: "couple", header: "Créer un couple" },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const nom = row?.original.nom
            return <CellAction nom={nom} />
        },
    },
]
