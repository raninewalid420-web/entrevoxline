import { useEffect } from "react";
import { Mass_Purcsa } from "../api/mass";
import { columnPurcsa } from "../components/dataTables/columnPurcsa";
import { DataTable } from "../components/dataTables/Tables/data-table";
import useAsync from "../hooks/useAsync";

// ✅ Données

export default function PurcsaData() {
  const { data, error, loading, execute } = useAsync(Mass_Purcsa, []);

  useEffect(() => {
    execute();
  }, [execute]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 py-8 w-full">
      <div className="w-[90%] mx-25">
        {/* Header avec badge */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="px-4 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-full">
              MASS - PURCSA
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Gestion des Plaintes PURCSA
          </h1>
          <p className="text-slate-600 text-lg">
            Suivi et traitement des doléances agricoles et ouvrages
          </p>
        </div>

        {/* Tableau principal */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5">
            <h2 className="text-xl font-semibold text-white">
              Registre des plaintes
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Liste complète des doléances enregistrées
            </p>
          </div>
          <div className="p-6">
            <DataTable columns={columnPurcsa} data={data || []} TypeFilter="nom" />
          </div>
        </div>
      </div>
    </div>
  );
}
