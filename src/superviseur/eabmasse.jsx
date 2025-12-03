"use client";

import { useEffect } from "react";
import { columnsEAB } from "../components/dataTables/columneabmass";
import { DataTable } from "../components/dataTables/data-table";
import useAsync from "../hooks/useAsync";
import { Mass_Eabs } from "../api/mass";

export default function EABData() {
  const { data, error, loading, execute } = useAsync(Mass_Eabs, []);

  useEffect(() => {
    execute();
  }, [execute]);
  // Sécurise les données (évite les erreurs TanStack)
  const safeData = Array.isArray(data) ? data : [];
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 py-8 w-full">
      <div className="w-[90%] mx-25">
        {/* Header avec badge */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="px-4 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-full">
              MASS - EABS
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Programme (EABS)
          </h1>
          <p className="text-slate-600 text-lg">
            un programme national du Ministère des Affaires Sociales et des
            Solidarités de Djibouti visant à favoriser l’inclusion, la <br />
            scolarisation et l’accompagnement des enfants en situation de
            handicap ou ayant des besoins éducatifs particuliers.
          </p>
        </div>

        {/* Tableau principal */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5">
            <h2 className="text-xl font-semibold text-white">
              Registre des demandes EABS
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Liste complète des opérations bancaires enregistrées
            </p>
          </div>

          <div className="p-6">
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
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <p className="text-slate-700 font-medium mb-1">
                  Aucune demande enregistrée
                </p>
                <p className="text-slate-500 text-sm">
                  Les demandes EAPS apparaîtront ici dès leur enregistrement.
                </p>
              </div>
            ) : (
              <DataTable columns={columnsEAB} data={safeData} TypeFilter="nom" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
