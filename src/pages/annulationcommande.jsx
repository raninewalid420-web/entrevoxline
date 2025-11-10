import { DataTable } from "../components/dataTables/data-table"
import { columnsCommandAnnuler } from "../components/dataTables/columncommandannuler";

// Données
export const dataCommandAnnuler = [
  {
    nom: "abdinasser",
    telephone: "77412536",
    Commande: "Dj105",
    dateCommande: "2025-08-03",
    raison: "je sais pas . comme ca bass",
    dateEnregistrement: "2025-08-03 09:22:51",
    creePar: "neima ibrahim abdi",
  },
  {
    nom: "layla abdi farah",
    telephone: "77101232",
    Commande: "Dj1055",
    dateCommande: "2025-10-12",
    raison: "gdfkghdfhghghhg vv",
    dateEnregistrement: "2025-08-03 09:07:32",
    creePar: "neima ibrahim abdi",
  },
];

export default function CommandeannulerData() {
  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="w-[90%] mx-25">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Commandes Annulées
          </h1>
          <p className="text-slate-600">
            Liste des commandes annulées par les clients
          </p>
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5">
            <h2 className="text-xl font-semibold text-white">
              Historique des annulations
            </h2>
          </div>
          <div className="p-6">
            <DataTable columns={columnsCommandAnnuler} data={dataCommandAnnuler} />
          </div>
        </div>
      </div>
    </div>
  )
}