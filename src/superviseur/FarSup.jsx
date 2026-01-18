import React, { useEffect } from "react";
import { ShowFar } from "../api/far";
import { Farcolumns } from "../components/dataTables/columnFar";
import useAsync from "../hooks/useAsync";
import { DataTable } from "../components/dataTables/Tables/data-table";

const FarSup = () => {
  const { data, error, loading, execute } = useAsync(ShowFar, []);

  useEffect(() => {
    execute();
  }, [execute]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 py-8 w-full">
      <div className="w-[90%] mx-25">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="px-4 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-full">
              Far
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Gestion de Far
          </h1>
          <p className="text-slate-600 text-lg">Suivi de projet Far</p>
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5">
            <h2 className="text-xl font-semibold text-white">
              Registre des demandes Far
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Liste complète des projets enregistrés
            </p>
          </div>
          <div className="p-6">
            <DataTable
              columns={Farcolumns}
              data={data || []}
              TypeFilter="nom"
              DateFilter="created_at"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarSup;
