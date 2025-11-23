import React, { useState, useMemo, useEffect } from "react";
import { KPICard } from "./KPICard";
import { FilterBar } from "./FilterBar";
import { Charts } from "./Charts";

import useAsync from "../../hooks/useAsync";

// Import des API
import { countAdrCases } from "../../api/adr";
import { Countcartin } from "../../api/cartun";
import { Countarulos } from "../../api/arulos";
import { CountCancel } from "../../api/annulation_cmd";
import { CountColisNoFound } from "../../api/coli_non_found";
import { CountInfo } from "../../api/information";
import { CountEab } from "../../api/eab";
import { CountMass } from "../../api/mass";
import { Mass } from "./data";

export const Dashboard = () => {
  const [filters, setFilters] = useState({
    project: "",
    month: "",
  });

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
  }, [filters]);

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
  // 3️⃣ Tableau dynamique des APIs
  // -----------------------------------
  const apiList = [
    { key: "adr", fn: countAdrCases },
    { key: "cartin", fn: Countcartin },
    { key: "arulos", fn: Countarulos },
    { key: "cancel", fn: CountCancel },
    { key: "colis", fn: CountColisNoFound },
    { key: "info", fn: CountInfo },
    { key: "eab", fn: CountEab },
    { key: "mass", fn: CountMass },
  ];

  // -----------------------------------
  // 4️⃣ Génère dynamiquement les hooks
  // -----------------------------------
  const hooks = apiList.map(({ fn }) => useAsync(fn, []));

  // -----------------------------------
  // 5️⃣ Lance toutes les API au chargement
  // -----------------------------------
  useEffect(() => {
    hooks.forEach((h) => h.execute());
  }, []);

  // -----------------------------------
  // 6️⃣ Stocke les résultats dans un objet clean
  // -----------------------------------
  const results = Object.fromEntries(
    apiList.map((api, i) => [api.key, hooks[i].data])
  );

  // -----------------------------------
  // 7️⃣ Loader si toutes les data ne sont pas encore arrivées
  // -----------------------------------
  if (Object.values(results).some((v) => !v)) {
    return <div className="text-center p-6">Chargement...</div>;
  }

  // ---------------------------
  // 8️⃣ UI finale
  // ---------------------------
  return (
    <div className="p-6 space-y-6">
      {/* Filtres */}
      <FilterBar
        filters={{
          projects: [
            "All",
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

      {/* Cards KPI */}
      <div className="flex gap-4 flex-wrap">
        <KPICard
          title="Mass"
          value={results.mass[0].total}
          description="Total plaintes Mass"
        />
        <KPICard
          title="ADR"
          value={results.adr[0].total}
          description="Total ADR"
        />
        <KPICard
          title="Cartin"
          value={results.cartin[0].total}
          description="Total Cartin"
        />
        <KPICard
          title="Arulos"
          value={results.arulos[0].total}
          description="Total Arulos"
        />
        <KPICard
          title="EAB"
          value={results.eab[0].total}
          description="Total EAB"
        />
        <KPICard
          title="Cancel Orders"
          value={results.cancel[0].total}
          description="Total commandes annulées"
        />
        <KPICard
          title="Colis Not Found"
          value={results.colis[0].total}
          description="Colis non trouvés"
        />
        <KPICard
          title="Information"
          value={results.info[0].total}
          description="Informations reçues"
        />
      </div>

      {/* Charts */}
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
