"use client";

import { useEffect } from "react";
import { Mass_Aseri } from "../api/mass";
import { columnsaseri } from "../components/dataTables/columnaseri";
import { DataTable } from "../components/dataTables/data-table";
import useAsync from "../hooks/useAsync";

export default function Aseri() {
  const { data, error, loading, execute } = useAsync(Mass_Aseri, []);

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
              MASS - ASERI
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Appui Social aux Étudiants en Retrait d’Inscription (ASERI)
          </h1>
          <p className="text-slate-600 text-lg">
            Suivi et accompagnement des étudiants bénéficiaires du programme
            ASERI
          </p>
        </div>

        {/* Tableau principal */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5">
            <h2 className="text-xl font-semibold text-white">
              Registre des demandes étudiantes
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Liste complète des plaintes et doléances enregistrées
            </p>
          </div>
          <div className="p-6">
            <DataTable columns={columnsaseri} data={data || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
