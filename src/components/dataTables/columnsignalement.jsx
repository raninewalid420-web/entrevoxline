import React from "react";

export const Signalementcolumns = [
  { accessorKey: "date", header: "Date" },
  { accessorKey: "nom", header: "Nom" },
  { accessorKey: "tel", header: "Téléphone" },

  { accessorKey: "nature", header: "Nature" },
  { accessorKey: "commune", header: "Commune" }, // ← nouveau

  { accessorKey: "zone", header: "Quartier" },

  { accessorKey: "commerce", header: "Type Commerce" },
  { accessorKey: "nom_commerce", header: "Nom commerce" }, // ← nouveau

  { accessorKey: "prix_depart", header: "Prix départ" }, // nouveau
  { accessorKey: "prix_actuel", header: "Prix actuel" }, // ← nouveau

  { accessorKey: "comparaison", header: "Comparaison" },

  {
    accessorKey: "details",
    header: "Commentaire",
    cell: ({ row }) => (
      <div className="min-w-[500px] max-w-[700px] whitespace-pre-wrap">
        {row.original.details}
      </div>
    ),
  },

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
