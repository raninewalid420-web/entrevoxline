"use client";

import { useEffect } from "react";
import { DataTable } from "../components/dataTables/data-table";
import { columnsFreeFood } from "../components/dataTables/freshfoodcolumn";
import useAsync from "../hooks/useAsync";
import { Mass_FreshFood } from "../api/mass";

export default function FreeshData() {
  const { data, error, loading, execute } = useAsync(Mass_FreshFood, []);

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
              MASS - FRESH FOOD
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Programme Fresh Food Assistance
          </h1>
          <p className="text-slate-600 text-lg">
            Suivi des plaintes, dysfonctionnements et retards de transfert
            alimentaire
          </p>
        </div>

        {/* Tableau principal */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5">
            <h2 className="text-xl font-semibold text-white">
              Registre des plaintes Fresh Food
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Historique des incidents et demandes d’assistance enregistrés
            </p>
          </div>

          <div className="p-6">
            <DataTable columns={columnsFreeFood} data={data || []} TypeFilter="nom" />
          </div>
        </div>
      </div>
    </div>
  );
}
