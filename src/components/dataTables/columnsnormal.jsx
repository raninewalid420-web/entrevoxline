// columns.js
export const columnormaux = [
  {
    accessorKey: "nom",
    header: "Nom",
  },
  {
    accessorKey: "telephone",
    header: "Téléphone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "adresse",
    header: "Adresse",
  },
  {
    accessorKey: "lieu",
    header: "Lieu",
  },
  {
    accessorKey: "responsable",
    header: "Responsable",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => new Date(getValue()).toLocaleString("fr-FR"),
  },
  {
    accessorKey: "commentaire",
    header: "Commentaire",
    cell: ({ row }) => (
      <p
        className="max-w-[700px] w-[450px] h-max resize-none border rounded-md p-2 text-sm bg-white text-wrap"
      >{row.original.commentaire} </p>
    ),
  },
  {
    accessorKey: "creePar",
    header: "Créé par",
  },
]

