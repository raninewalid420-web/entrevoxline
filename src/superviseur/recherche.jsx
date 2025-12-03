"use client";

import * as React from "react";
import { DataTable } from "../components/dataTables/data-table";
import { columns } from "../components/dataTables/columns";
import useAsync from "../hooks/useAsync";
import { AfficherCartin } from "../api/recherche";

export default function Recherche() {
  const { data, error, loading, execute } = useAsync(AfficherCartin, []);

  React.useEffect(() => {
    execute();
  }, [execute]);
  // Sécurise les données (évite les erreurs TanStack)
  const safeData = Array.isArray(data) ? data : [];
  return (
    <div className="min-h-screen bg-slate-100 py-8 w-full">
      <div className="w-[90%] mx-25">
        {/* Header avec badge */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Rechercher un colis
          </h1>
          <p className="text-slate-600">
            Recherchez et consultez les informations des colis
          </p>
        </div>

        {/* Tableau principal */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5">
            <h2 className="text-xl font-semibold text-white">
              Registre des interventions Cartin (recherche colis)
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Liste complète des opérations enregistrées
            </p>
          </div>
          <div className="p-6">
            {loading || safeData.length === 0 ? (
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
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <p className="text-slate-700 font-medium mb-1">
                  Aucun colis enregistré
                </p>
                <p className="text-slate-500 text-sm">
                  Les colis apparaîtront ici une fois ajoutés
                </p>
              </div>
            ) : (
              <DataTable columns={columns} data={safeData} TypeFilter="Nom" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
