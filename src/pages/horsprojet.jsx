"use client"

import { columnsHorsProjet } from "../components/dataTables/columnhs"
import { DataTable } from "../components/dataTables/data-table"

// ✅ Données Hors Projet
export const dataHorsProjet = [
  {
    numeroPlainte: 107,
    dateSaisi: "2025-10-23",
    nom: "Neima Moussa Nour",
    nomConjoint: "Omar Houmed",
    telephone: "77033480",
    dateNaissance: "1987-01-01",
    cin: "093211",
    genre: "Femme",
    region: "Djibouti-ville",
    commune: "Balbala",
    quartier: "Cité Nassib",
    descriptionPlainte:
      "L'appelant souhaite un appui financier pour agrandir son atelier de couture et développer ses activités. C’est la deuxième fois qu’elle nous contacte.",
    categoriePlainte: "doleance",
    creePar: "ASMA SAID",
  },
  {
    numeroPlainte: 101,
    dateSaisi: "2025-10-22",
    nom: "Abdi Omar Hoch",
    nomConjoint: "",
    telephone: "77641629",
    dateNaissance: "2001-01-01",
    cin: "291349",
    genre: "Homme",
    region: "Djibouti-ville",
    commune: "Balbala",
    quartier: "PK12",
    descriptionPlainte:
      "L’appelant dispose déjà d’un petit commerce et souhaite bénéficier d’un soutien pour le développer.",
    categoriePlainte: "doleance",
    creePar: "Zakaria Omar Kalid",
  },
  // … autres données inchangées …
]

export default function HsData() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header avec badge */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="px-4 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-full">
              MASS - HORS PROJET
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Gestion Hors Projet
          </h1>
          <p className="text-slate-600 text-lg">
            Suivi des demandes et doléances non liées aux projets existants
          </p>
        </div>

        {/* Tableau principal */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5">
            <h2 className="text-xl font-semibold text-white">
              Registre des plaintes Hors Projet
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Historique des demandes et doléances non projetées
            </p>
          </div>

          <div className="p-6">
            {dataHorsProjet.length === 0 ? (
              <div className="text-center py-14">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 mb-5">
                  <svg
                    className="w-10 h-10 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <p className="text-slate-700 font-medium mb-1">
                  Aucune donnée enregistrée
                </p>
                <p className="text-slate-500 text-sm">
                  Les plaintes Hors Projet apparaîtront ici une fois enregistrées
                </p>
              </div>
            ) : (
              <DataTable columns={columnsHorsProjet} data={dataHorsProjet} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
