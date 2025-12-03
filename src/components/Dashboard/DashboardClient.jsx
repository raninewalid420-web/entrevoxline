import React, { useState, useMemo, useEffect } from "react";
import { KPICard } from "./KPICard";
import { FilterBar } from "./FilterBar";
import { Charts } from "./Charts";
import { GetMass } from "../../api/data";
import { CountMass } from "../../api/mass";
import useAsync from "../../hooks/useAsync";

export const DashboardClient = () => {
  const [filters, setFilters] = useState({
    project: "",
    month: "",
  });

  // Mass
  const { data, loading, execute } = useAsync(GetMass, []);

  useEffect(() => {
    execute();
  }, [execute]);

  const Mass = Array.isArray(data) ? data : [];

  const handleFilterChange = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  // ---------------------------
  // 1️⃣ Filtrage dynamique Mass
  // ---------------------------
  const filteredMass = useMemo(() => {
    return Mass.filter((item) => {
      return (
        (!filters.project || item.project === filters.project) &&
        (!filters.month || item.date.startsWith(filters.month))
      );
    });
  }, [filters, Mass]); // <-- Correction importante

  // ---------------------------
  // 2️⃣ Prépare les graphiques
  // ---------------------------
  const projectChart = Object.entries(
    filteredMass.reduce((acc, item) => {
      acc[item.project] = (acc[item.project] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const monthChart = Object.entries(
    filteredMass.reduce((acc, item) => {
      const month = item.date.slice(0, 7);
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  // -----------------------------------
  // 3️⃣ Liste des APIs dynamiques
  // -----------------------------------
  const apiList = [{ key: "mass", fn: CountMass }];

  // -----------------------------------
  // 4️⃣ Hooks générés dynamiquement
  // -----------------------------------
  const hooks = apiList.map(({ fn }) => useAsync(fn, []));

  // -----------------------------------
  // 5️⃣ Lance toutes les API
  // -----------------------------------
  useEffect(() => {
    hooks.forEach((h) => h.execute());
  }, []); // ok

  // -----------------------------------
  // 6️⃣ Résultat des APIs
  // -----------------------------------
  const results = Object.fromEntries(
    apiList.map((api, i) => [api.key, hooks[i].data])
  );

  // -----------------------------------
  // 7️⃣ Loader global
  // -----------------------------------
  const isLoadingAPIs = loading || hooks.some((h) => h.loading);

  const isMissingData = Object.values(results).some((v) => !v);

  if (isLoadingAPIs || isMissingData) {
    return <div className="text-center p-6">Chargement...</div>;
  }

  // ---------------------------
  // 8️⃣ UI finale
  // ---------------------------

  return (
    <div className="p-6 space-y-6">
      <FilterBar
        filters={{
          projects: [
            "purcsa",
            "pirb",
            "agr",
            "pass",
            "ps",
            "aseri",
            "eaps",
            "hors_projets",
            "crec",
            "fresh_food",
          ],
        }}
        onChange={handleFilterChange}
      />

      <div className="flex gap-4 flex-wrap">
        <KPICard
          title="Mass"
          value={results.mass?.[0]?.total ?? 0}
          description="Total plaintes Mass"
        />
      </div>

      <Charts
        data={projectChart}
        title="Mass par projet"
        dataKey="name"
        barKey="value"
      />
      <Charts
        data={monthChart}
        title="Mass par mois"
        dataKey="name"
        barKey="value"
      />
    </div>
  );
};
