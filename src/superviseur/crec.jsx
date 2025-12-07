"use client";

import { useEffect } from "react";
import { columnscrec } from "../components/dataTables/columncrec";
import { DataTable } from "../components/dataTables/Tables/data-table";
import useAsync from "../hooks/useAsync";
import { Mass_Crec } from "../api/mass";

export default function Crec() {
  const { data, error, loading, execute } = useAsync(Mass_Crec, []);

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
              MASS - CREC
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Centres Ruraux d’Épargne et de Crédit (CREC)
          </h1>
          <p className="text-slate-600 text-lg">
            Accompagnement et suivi des groupements pour l’accès aux services
            financiers ruraux
          </p>
        </div>

        {/* Tableau principal */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5">
            <h2 className="text-xl font-semibold text-white">
              Registre des demandes CREC
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Suivi des doléances et appuis aux bénéficiaires ruraux
            </p>
          </div>
          <div className="p-6">
            <DataTable columns={columnscrec} data={data || []} TypeFilter="nom" />
          </div>
        </div>
      </div>
    </div>
  );
}
