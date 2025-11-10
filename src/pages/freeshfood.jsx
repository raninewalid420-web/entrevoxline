"use client"

import { DataTable } from "../components/dataTables/data-table"
import { columnsFreeFood } from "../components/dataTables/freshfoodcolumn"

// ✅ Données Fresh Food
export const dataFreeshfood = [
  {
    numeroPlainte: 94,
    dateSaisi: "2025-10-21",
    nom: "Kafia Asan Mohamed",
    nomConjoint: "Fathi Hassan Yonis",
    telephone: "77260936",
    dateNaissance: "1996-05-29",
    cin: "CIN242886 / CIN144384",
    genre: "Femme",
    region: "Djibouti-ville",
    commune: "Balbala",
    quartier: "Torabora",
    descriptionPlainte:
      "Madame Kafia signale que la carte (1254d6) remise ne fonctionne pas, ni pour elle ni pour son époux. Elle précise que la carte expirera bientôt sans avoir pu l’utiliser.",
    categoryPlainte: "plainte",
    typeProbleme: "Dysfonctionnement de la carte SCOOP",
    creePar: "Soumaya Awaleh Aouled",
  },
  {
    numeroPlainte: 64,
    dateSaisi: "2025-10-06",
    nom: "Said Abdi Waberi",
    nomConjoint: "Habiba Galil Farah",
    telephone: "77021333",
    dateNaissance: "1990-05-30",
    cin: "CN021333",
    genre: "Homme",
    region: "Arta",
    commune: "",
    quartier: "",
    descriptionPlainte:
      "Le plaignant indique qu’il devait recevoir une nouvelle carte bleue depuis juillet 2025, mais n’a toujours rien reçu. Il s’inquiète du retard dans le transfert prévu de 10 000 francs.",
    categoryPlainte: "plainte",
    typeProbleme: "Retard dans le cycle de transfert",
    creePar: "Radwan Hassan Omar",
  },
  {
    numeroPlainte: 37,
    dateSaisi: "2025-09-23",
    nom: "Said Abdi Waberi",
    nomConjoint: "Habiba Galil Farah",
    telephone: "77021333",
    dateNaissance: "1990-05-30",
    cin: "CN030779",
    genre: "Homme",
    region: "Arta",
    commune: "",
    quartier: "",
    descriptionPlainte:
      "Le plaignant attend toujours le remplacement de sa carte bleue annoncée depuis juillet 2025. Aucun versement n’a été effectué depuis cette date.",
    categoryPlainte: "plainte",
    typeProbleme: "Retard dans le cycle de transfert",
    creePar: "Radwan Hassan Omar",
  },
]

export default function FreeshData() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header avec badge */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="px-4 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-full">
              MASS - FRESH FOOD
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Programme Fresh Food Assistance
          </h1>
          <p className="text-slate-600 text-lg">
            Suivi des plaintes, dysfonctionnements et retards de transfert alimentaire
          </p>
        </div>

        {/* Tableau principal */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5">
            <h2 className="text-xl font-semibold text-white">
              Registre des plaintes Fresh Food
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Historique des incidents et demandes d’assistance enregistrés
            </p>
          </div>

          <div className="p-6">
            <DataTable columns={columnsFreeFood} data={dataFreeshfood} />
          </div>
        </div>
      </div>
    </div>
  )
}
