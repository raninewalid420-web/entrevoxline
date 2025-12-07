"use client";

import { useEffect } from "react";
import { Mass_Ps } from "../api/mass";
import { columnsPs } from "../components/dataTables/columnps";
import { DataTable } from "../components/dataTables/Tables/data-table";
import useAsync from "../hooks/useAsync";

export default function PsData() {
  const { data, error, loading, execute } = useAsync(Mass_Ps, []);

  useEffect(() => {
    execute();
  }, [execute]);

  // Sécurise les données (évite les erreurs TanStack)
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 py-8 w-full">
      <div className="w-[90%] mx-25">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="px-4 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-full">
              MASS - PS
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Programme PS
          </h1>
          <p className="text-slate-600 text-lg">
            Protection et suivi des bénéficiaires du projet PS
          </p>
        </div>

        {/* Tableau principal */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5">
            <h2 className="text-xl font-semibold text-white">
              Registre des plaintes et informations PS
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Historique des plaintes et informations des bénéficiaires
            </p>
          </div>

          <div className="p-6">

            {/* === Condition d'affichage === */}
            {loading || safeData.length === 0 ? (
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 1 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <p className="text-slate-700 font-medium mb-1">
                  Aucune donnée enregistrée
                </p>
                <p className="text-slate-500 text-sm">
                  Les plaintes PS apparaîtront ici dès leur enregistrement.
                </p>
              </div>
            ) : (
              <DataTable columns={columnsPs} data={safeData} TypeFilter="nom" />
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
