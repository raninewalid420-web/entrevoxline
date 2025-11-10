import { columnsagr } from "../components/dataTables/columnsagr"
import { DataTable } from "../components/dataTables/data-table"

export const dataAgr = [
  {
    numeroPlainte: 109,
    dateSaisi: "2025-10-26",
    nom: "Habon Mourad Abdallah",
    nomConjoint: "Imran Wahib Mohamed",
    telephone: "77643011",
    dateNaissance: "1989-11-29",
    cin: "CIN076244",
    genre: "Femme",
    region: "Djibouti-ville",
    commune: "Boulaos",
    quartier: "Quartier 7",
    descriptionPlainte:
      "L'appelante exprime le souhait de créer une entreprise afin de subvenir aux besoins de ses enfants, son mari étant actuellement au chômage. Elle sollicite ainsi un accompagnement et un appui pour développer une activité génératrice de revenus, lui permettant d'assurer la stabilité économique et le bien-être de sa famille. Elle habite avec sa belle-famille.",
    categoryPlainte: "doleance",
    typeProbleme:
      "Appui financier au démarrage de nouvelles AGR et renforcement des AGR existantes",
    statusPlainte: "",
    creePar: "AYAN SAID",
    actions: "",
  },
  {
    numeroPlainte: 108,
    dateSaisi: "2025-10-25",
    nom: "Fatouma Ali Kamil",
    nomConjoint: "",
    telephone: "77577432",
    dateNaissance: "1998-02-06",
    cin: "346840",
    genre: "Femme",
    region: "Tadjourah",
    commune: "",
    quartier: "",
    descriptionPlainte:
      "Pour l'instant, Mme Fatouma vend du café, mais elle aspire à ouvrir une boutique et à établir une activité plus stable que celle qu'elle exerce maintenant.",
    categoryPlainte: "doleance",
    typeProbleme:
      "Appui financier au démarrage de nouvelles AGR et renforcement des AGR existantes",
    statusPlainte: "",
    creePar: "LOULA YASSER",
    actions: "",
  },
]

export default function AGR() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header avec badge */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="px-4 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-full">
              MASS - AGR
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Gestion des Activités Génératrices de Revenus (AGR)
          </h1>
          <p className="text-slate-600 text-lg">
            Suivi et accompagnement des projets économiques et des doléances liées aux AGR
          </p>
        </div>

        {/* Tableau principal */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5">
            <h2 className="text-xl font-semibold text-white">
              Registre des demandes AGR
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Liste complète des projets enregistrés
            </p>
          </div>
          <div className="p-6">
            <DataTable columns={columnsagr} data={dataAgr} />
          </div>
        </div>
      </div>
    </div>
  )
}
