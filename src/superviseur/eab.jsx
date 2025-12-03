"use client";

import * as React from "react";
import { DataTable } from "../components/dataTables/data-table";
import { EABcolumns } from "../components/dataTables/columneab";
import { EabShow } from "../api/eab";
import useAsync from "../hooks/useAsync";

export default function EAB() {
  const { data, error, loading, execute } = useAsync(EabShow, []);

  React.useEffect(() => {
    execute();
  }, [execute]);
  // Sécurise les données (évite les erreurs TanStack)
  const safeData = Array.isArray(data) ? data : [];
  return (
    <div className="min-h-screen bg-slate-100 py-8 w-full">
      <div className="w-[90%] mx-25">
        {/* Header complet comme CREC / FreshFood */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Tableau EAB
          </h1>
          <p className="text-slate-600">
            Gestion des plaintes et demandes clients
          </p>
        </div>

        {/* Tableau principal */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5">
            <h2 className="text-xl font-semibold text-white">
              Registre des interventions ARULOS
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Liste complète des opérations enregistrées
            </p>
          </div>
          <div className="p-6">
            {safeData.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                  <svg
                    className="w-8 h-8 text-slate-400"
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
                  Aucune plainte enregistrée
                </p>
                <p className="text-slate-500 text-sm">
                  Les plaintes EAB apparaîtront ici une fois enregistrées
                </p>
              </div>
            ) : (
              <DataTable columns={EABcolumns} data={safeData} TypeFilter="nom_client" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
