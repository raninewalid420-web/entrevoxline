import React from "react";

export const Signalementcolumns = [

  { accessorKey: "date", header: "Date" },

  { accessorKey: "nature", header: "Nature" },

  { accessorKey: "zone", header: "Zone" },

  { accessorKey: "commerce", header: "Commerce" },

  { accessorKey: "produit", header: "Produit" },

  { accessorKey: "prix", header: "Prix" },

  { accessorKey: "comparaison", header: "Comparaison" },

  {
    accessorKey: "details",
    header: "Détails",
    cell: ({ row }) => (
      <div className="min-w-[500px] max-w-[700px] whitespace-pre-wrap">
        {row.original.details}
      </div>
    ),
  },

  { accessorKey: "nom", header: "Nom" },

  { accessorKey: "tel", header: "Téléphone" },

  {
    accessorKey: "anonyme",
    header: "Anonyme",
    cell: ({ row }) => {
      const value = row.original.anonyme;
      const isAnonyme = value === true || value === 1 || value === "1";
      return (
        <span
          className={`font-semibold ${
            isAnonyme ? "text-green-600" : "text-red-600"
          }`}
        >
          {isAnonyme ? "Oui" : "Non"}
        </span>
      );
    },
  },
];