import React, { useState, useMemo } from "react";
import { KPICard } from "./KPICard";
import { FilterBar } from "./FilterBar";
import { Charts } from "./Charts";
import { mockData } from "./data";

export const Dashboard = () => {
  const [filters, setFilters] = useState({ project: "", region: "", month: "" });

  const handleFilterChange = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));

  // Filtrage dynamique
  const filteredMass = useMemo(() => {
    return mockData.mass.filter(item => {
      return (!filters.project || item.project === filters.project) &&
             (!filters.region || item.region === filters.region) &&
             (!filters.month || item.date.startsWith(filters.month));
    });
  }, [filters]);

  // KPIs globaux
  const totalMass = filteredMass.length;
  const totalADR = mockData.adr.length;
  const totalCartin = mockData.cartin.length;
  const totalArulos = mockData.arulos.length;
  const totalEAB = mockData.eab.length;
  const totalCancel = mockData.cancel_orders.length;
  const totalColis = mockData.colis_no_found.length;
  const totalInfo = mockData.information.length;

  // Graphiques par projet
  const projectChart = Object.entries(
    filteredMass.reduce((acc, item) => {
      acc[item.project] = (acc[item.project] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  // Graphiques par mois
  const monthChart = Object.entries(
    filteredMass.reduce((acc, item) => {
      const month = item.date.slice(0, 7);
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="p-6 space-y-6">
      <FilterBar
        filters={{
          projects: ["purcsa","pirb","agr","pass","ps","aseri","eaps","hors_projets","crec","fresh_food"],
          regions: ["Region 1","Region 2","Region 3"],
        }}
        onChange={handleFilterChange}
      />

      <div className="flex gap-4 flex-wrap">
        <KPICard title="Mass" value={totalMass} description="Total plaintes Mass" />
        <KPICard title="ADR" value={totalADR} description="Total ADR" />
        <KPICard title="Cartin" value={totalCartin} description="Total Cartin" />
        <KPICard title="Arulos" value={totalArulos} description="Total Arulos" />
        <KPICard title="EAB" value={totalEAB} description="Total EAB" />
        <KPICard title="Cancel Orders" value={totalCancel} description="Total commandes annulées" />
        <KPICard title="Colis Not Found" value={totalColis} description="Colis non trouvés" />
        <KPICard title="Information" value={totalInfo} description="Informations" />
      </div>

      <Charts data={projectChart} title="Mass par projet" dataKey="name" barKey="value" />
      <Charts data={monthChart} title="Mass par mois" dataKey="name" barKey="value" />
    </div>
  );
};
