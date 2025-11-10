import { columnPurcsa } from "../components/dataTables/columnPurcsa";
import { DataTable } from "../components/dataTables/data-table"

// ✅ Données
export const dataPurcsa = [
  {
    numeroPlainte: "95",
    dateSaisi: "2025-10-22",
    nom: "maysoun elmi jideh",
    nomConjointe: "",
    telephone: "77173737",
    dateNaissance: "2025-10-22",
    cin: "42789",
    genre: "Femme",
    region: "ARTA",
    localite: "Atar/Dmarjog",
    descriptionPlainte: "test",
    nomDeleguer: "Farhan Adaweh Guelleh",
    dateDepot: "2025-10-22",
    dateResolutionCL: "2025-11-05",
    resolutionCL: "test",
    categorie: "non_solvable",
    plainte: "Agriculture",
    sousTypeOuvrage: "",
    satisfaction: "Non",
    statusPlainte: "En cours",
    creePar: "TEST",
    actions: "",
  },
  {
    numeroPlainte: "92",
    dateSaisi: "2025-10-21",
    nom: "Ali Moussa Hassan",
    nomConjointe: "",
    telephone: "77616104",
    dateNaissance: "1989-04-11",
    cin: "",
    genre: "Homme",
    region: "Tadjourah",
    localite: "Mabla",
    descriptionPlainte: `le déléguer souhaite trouver une solution durable aux débordements de l'oued, qui causent des dégâts récurrents dans son propre jardin.
La date de dépôt exacte n'est pas connue, il s'agit d'une estimation.`,
    nomDeleguer: "Ali Moussa Hassan",
    dateDepot: "2025-08-20",
    dateResolutionCL: "0000-00-00",
    resolutionCL: "Il a étais aviser qu'ils vont voir une solution.",
    categorie: "non_solvable",
    plainte: "Agriculture",
    sousTypeOuvrage: "",
    satisfaction: "Non",
    statusPlainte: "En cours",
    creePar: "mariam youssouf abdallah",
    actions: "",
  },
  {
    numeroPlainte: "83",
    dateSaisi: "2025-10-11",
    nom: "Houmed Ibrahim Moussa",
    nomConjointe: "",
    telephone: "77147024",
    dateNaissance: "1968-05-20",
    cin: "276818",
    genre: "Homme",
    region: "Tadjourah",
    localite: "Daymoli",
    descriptionPlainte: `le déléguer souhaite avoir des matériaux jardinage comme des brouettes , Bêche , grillage et un reservoir dans le jardin  , il parlais au nom des habitants.`,
    nomDeleguer: "Houmed Ibrahim Moussa",
    dateDepot: "2025-10-11",
    dateResolutionCL: "0000-00-00",
    resolutionCL: "Le déléguer nous a informer qu'il étais diriger vers la ligne 2020.",
    categorie: "non_solvable",
    plainte: "Agriculture",
    sousTypeOuvrage: "",
    satisfaction: "Non",
    statusPlainte: "En cours",
    creePar: "mariam youssouf abdallah",
    actions: "",
  },
  {
    numeroPlainte: "78",
    dateSaisi: "2025-10-07",
    nom: "hassan merito housssein",
    nomConjointe: "",
    telephone: "77443099",
    dateNaissance: "1995-01-01",
    cin: "",
    genre: "Homme",
    region: "Tadjourah",
    localite: "Day",
    descriptionPlainte: `Le délégué a formulé une doléance sollicitant la construction d'un barrage, l'installation d'un système de pompage d'eau, la mise en place de panneaux solaires pour alimenter l'ouvrage ainsi que la création d'un abreuvoir .`,
    nomDeleguer: "Hassan Merito Houssein",
    dateDepot: "2025-10-07",
    dateResolutionCL: "0000-00-00",
    resolutionCL: "Le délégué nous a transmis directement sa demande sur la ligne 2020",
    categorie: "non_solvable",
    plainte: "Ouvrage",
    sousTypeOuvrage: "Barrage",
    satisfaction: "Non",
    statusPlainte: "En cours",
    creePar: "Fatouma Abdo",
    actions: "",
  },
  {
    numeroPlainte: "75",
    dateSaisi: "2025-10-07",
    nom: "moustalipha hared moussa",
    nomConjointe: "",
    telephone: "77307942",
    dateNaissance: "2002-06-12",
    cin: "CIN315401",
    genre: "Femme",
    region: "Dikhil",
    localite: "Harou",
    descriptionPlainte: "",
    nomDeleguer: "",
    dateDepot: "",
    dateResolutionCL: "",
    resolutionCL: "",
    categorie: "non_solvable",
    plainte: "Ouvrage",
    sousTypeOuvrage: "Barrage",
    satisfaction: "Non",
    statusPlainte: "En cours",
    creePar: "Radwan hassan omar",
    actions: "",
  },
];

export default function PurcsaData() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header avec badge */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="px-4 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-full">
              MASS - PURCSA
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Gestion des Plaintes PURCSA
          </h1>
          <p className="text-slate-600 text-lg">
            Suivi et traitement des doléances agricoles et ouvrages
          </p>
        </div>

        {/* Tableau principal */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5">
            <h2 className="text-xl font-semibold text-white">
              Registre des plaintes
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Liste complète des doléances enregistrées
            </p>
          </div>
          <div className="p-6">
            <DataTable columns={columnPurcsa} data={dataPurcsa} />
          </div>
        </div>
      </div>
    </div>
  )
}