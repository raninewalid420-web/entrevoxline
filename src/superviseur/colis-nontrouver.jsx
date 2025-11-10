import { DataTable } from "../components/dataTables/data-table"
import { columnsColisNonTrouver } from "../components/dataTables/columnscolis-nontrouver"

// Données
export const dataColisNonTrouver = [
  {
    nom: "samira osmazn ali",
    telephone: "77412141",
    reference: "ctn52Ap",
    type: "e-suuq",
    provenance: "france",
    date: "2024-07-23",
    creePar: "Nadira Houssein",
  },
  {
    nom: "mohamed houssein idriss",
    telephone: "77629168",
    reference: "S50339780244",
    type: "petit paquet",
    provenance: "DUBAI",
    date: "2025-02-08",
    creePar: "Nadira Houssein",
  },
  {
    nom: "Elmi Abdourahim Mahamoud",
    telephone: "77011341",
    reference: "6j61138688973",
    type: "E-suuq",
    provenance: "E-suuq",
    date: "2025-05-11",
    creePar: "Nadira Houssein",
  },
  {
    nom: "Wahid Tayeb Hachim",
    telephone: "77803907",
    reference: "CY144307985US",
    type: "E-suuq",
    provenance: "IB",
    date: "2024-12-22",
    creePar: "LOULA YASSER",
  },
  {
    nom: "Wahid Tayeb Hachim",
    telephone: "77803907",
    reference: "CY144307985US",
    type: "E-suuq",
    provenance: "IB",
    date: "2024-12-23",
    creePar: "LOULA YASSER",
  },
  {
    nom: "Nima Wahib Youssouf",
    telephone: "77558741",
    reference:
      "UA743867503AE / UA744966710AE / UA747151767AE / ...",
    type: "Colis-EMS",
    provenance: "Ali express",
    date: "2025-01-20",
    creePar: "LOULA YASSER",
  },
  {
    nom: "Neima Wahib Youssouf",
    telephone: "77558741",
    reference:
      "UA743867503AE / UA744966710AE / UA747151767AE / ...",
    type: "Petit-Paquet",
    provenance: "Ali Express",
    date: "2025-01-28",
    creePar: "LOULA YASSER",
  },
  {
    nom: "Fareed Med Charaf",
    telephone: "77160005",
    reference: "sans",
    type: "Courrier",
    provenance: "Thailande",
    date: "2025-02-16",
    creePar: "LOULA YASSER",
  },
  {
    nom: "Amal Mohamed Mohamed",
    telephone: "77253260",
    reference: "Courrier",
    type: "Courrier",
    provenance: "Thailande",
    date: "2025-04-20",
    creePar: "LOULA YASSER",
  },
  {
    nom: "Fatouma Houssein Med",
    telephone: "77792089",
    reference: "RK746702534FR",
    type: "Document",
    provenance: "France",
    date: "2025-04-27",
    creePar: "LOULA YASSER",
  },
]

export default function ColisNontrouverData() {
  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="w-[90%] mx-25">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Colis Non Trouvés
          </h1>
          <p className="text-slate-600">
            Suivi des colis manquants et non localisés
          </p>
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5">
            <h2 className="text-xl font-semibold text-white">
              Liste des colis non trouvés
            </h2>
          </div>
          <div className="p-6">
            <DataTable columns={columnsColisNonTrouver} data={dataColisNonTrouver} />
          </div>
        </div>
      </div>
    </div>
  )
}