import { DataTable } from "../components/dataTables/Tables/data-table";
import { columnsInformation } from "../components/dataTables/columninfo";
import { Info_Show } from "../api/information";
import useAsync from "../hooks/useAsync";
import { useEffect } from "react";

export default function InformationData() {
  const { data, error, loading, execute } = useAsync(Info_Show, []);

  useEffect(() => {
    execute();
  }, [execute]);
  // Sécurise les données (évite les erreurs TanStack)
  const safeData = Array.isArray(data) ? data : [];
  return (
    <div className="min-h-screen bg-slate-100 py-8 w-full">
      <div className="w-[90%] mx-25">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Informations Clients
          </h1>
          <p className="text-slate-600">
            Demandes d'information et renseignements clients
          </p>
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5">
            <h2 className="text-xl font-semibold text-white">
              Historique des demandes d'information
            </h2>
          </div>
          <div className="p-6">
            <DataTable columns={columnsInformation} data={safeData} TypeFilter="nom" />
          </div>
        </div>
      </div>
    </div>
  );
}
