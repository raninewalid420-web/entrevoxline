import { DataTable } from "../components/dataTables/Tables/data-table";
import { columnsCommandAnnuler } from "../components/dataTables/columncommandannuler";
import { Cancel_order_Show } from "../api/coli_non_found";
import useAsync from "../hooks/useAsync";
import { useEffect } from "react";

export default function CommandeannulerData() {
  const { data, error, loading, execute } = useAsync(Cancel_order_Show, []);

  useEffect(() => {
    execute();
  }, [execute]);
  // Sécurise les données (évite les erreurs TanStack)
  const safeData = Array.isArray(data) ? data : [];
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
            <DataTable columns={columnsCommandAnnuler} data={safeData} TypeFilter="nom_client" />
          </div>
        </div>
      </div>
    </div>
  );
}
