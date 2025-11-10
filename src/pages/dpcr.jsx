import { columnDPCR } from "../components/dataTables/columndpcr"
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { DataTable } from "../components/dataTables/data-table";

const datadpcr = [
  {
    idAppel: "AP-018",
    usager: "Conducteur",
    plaignant: "nadira test",
    contact: "777777777",
    typeRequete: "Incident / Urgence",
    description: "elle a fais une accident contre d'autre voiture",
    region: "Djibouti-ville",
    ville: "Balbala",
    route: "RN1",
    date: "2025-10-20 19:39:00",
    gravite: "Urgent",
    piecesJointes: [],
  },
  {
    idAppel: "AP-017",
    usager: "Communauté riveraine",
    plaignant: "zakaria",
    contact: "77010204",
    typeRequete: "Incident / Urgence",
    description: "test",
    region: "Djibouti-ville",
    ville: "Balbala",
    route: "RN1",
    date: "2025-10-20 19:24:00",
    gravite: "Très urgent",
    piecesJointes: [],
  },
  {
    idAppel: "AP-002",
    usager: "Voyageur",
    plaignant: "tesg",
    contact: "77121445",
    typeRequete: "Incident / Urgence",
    description: "testtttttttttttttttttttttttttttttttttttttttttttttt",
    region: "Djibouti-ville",
    ville: "Boulaos",
    route: "Route Industrielle",
    date: "2025-10-20 17:26:00",
    gravite: "Moyen",
    piecesJointes: [],
  },
]

export function DPCR() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Tableau DPCR
          </h1>
          <p className="text-slate-600">
            Gestion des incidents et urgences routières
          </p>
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
           <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5">
            <h2 className="text-xl font-semibold text-white">
              Registre des interventions ARULOS
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Liste complète des opérations enregistrées
            </p>
          </div>
          <div className="p-6">
            <DataTable columns={columnDPCR} data={datadpcr} />
          </div>
        </div>
      </div>
    </div>
  )
}