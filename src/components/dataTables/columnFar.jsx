import React from "react";

// ✅ Colonnes du tableau
export const Farcolumns = [
//   { accessorKey: "id", header: "ID" },

  // ⚠️ petit correctif : enlever l’espace après "reference"
  { accessorKey: "reference", header: "Référence" },

  { accessorKey: "date", header: "Date de plainte" },

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

  { accessorKey: "nom_reclamant", header: "Nom" },
  { accessorKey: "contact", header: "Contact" },
  { accessorKey: "type_plainte", header: "Type de plainte" },
  { accessorKey: "langue", header: "Langue" },
  { accessorKey: "region", header: "Région" },
  { accessorKey: "pointFocal", header: "Point focal" },

  {
    accessorKey: "details",
    header: "Commentaire",
    cell: ({ row }) => (
      <div className="min-w-[500px] max-w-[700px] whitespace-pre-wrap">
        {row.original.details}
      </div>
    ),
  },

  { accessorKey: "status", header: "Statut" },
  { accessorKey: "created_at", header: "Date de création" },
  { accessorKey: "agent", header: "Créé par" },
];
