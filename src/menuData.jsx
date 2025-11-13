import { ClipboardList, Database, FileText, FolderKanban, Home, Layers, Users } from "lucide-react";

export const menuData = [
  {
    title: "Navigation",
    items: [
      {
        path: "/dashboard",
        label: "Tableau de bord",
        icon: <Home className="w-4 h-4" />,
      },
      {
        path: "/agents",
        label: "Liste des agents",
        icon: <Users className="w-4 h-4" />,
      },
    ],
  },

  {
    title: "Masse",
    items: [
      {
        label: "Masse",
        icon: <Layers className="w-4 h-4" />,
        children: [
          { path: "/masse/PurcsaData", label: "PURCSA" },
          { path: "/masse/AGR", label: "AGR" },
          { path: "/masse/Aseri", label: "ASERI" },
          { path: "/masse/Crec", label: "CREC" },
          { path: "/masse/EABData", label: "Eabs" },
          { path: "/masse/FreeshData", label: "Freesh Food" },
          { path: "/masse/PassData", label: "Pass" },
          { path: "/masse/PirbData", label: "PIRB" },
          { path: "/masse/PsData", label: "PS" },
          { path: "/masse/HsData", label: "Hors Projet" },
        ],
      },
    ],
  },

  {
    title: "Autres",
    items: [
      {
        path: "/adr",
        label: "ADR",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/cartin",
        label: "Cartin",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/recherche",
        label: "Recherche",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Arulos",
        label: "Arulos",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/EAB",
        label: "EAB Bank",
        icon: <Database className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/DPCR",
        label: "DPCR",
        icon: <Database className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/commandeannulerData",
        label: "Annulation commande",
        icon: <ClipboardList className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/ColisNontrouverData",
        label: "Colis non trouvé",
        icon: <FileText className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/InformationData",
        label: "Information",
        icon: <FileText className="w-4 h-4 opacity-70" />,
      },
    ],
  },
];

export const menuDataforagents = [
  {
    title: "Navigation",
    items: [
      {
        path: "/Agents/mass",
        label: "Mass",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/adr",
        label: "ADR",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/cartin",
        label: "Cartin",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/recherche",
        label: "Recherche",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/Arulos",
        label: "Arulos",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/EAB",
        label: "EAB Bank",
        icon: <Database className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/DPCR",
        label: "DPCR",
        icon: <Database className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/commandeannulerData",
        label: "Annulation commande",
        icon: <ClipboardList className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/InformationData",
        label: "Information",
        icon: <FileText className="w-4 h-4 opacity-70" />,
      },
    ],
  },
];

export const menuDataforClientMass = [
  {
    title: "Programme Mass",
    items: [
      {
        path: "/Client/Purcsa",
        label: "Purcsa",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Client/Agr",
        label: "Agr",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Client/Aseri",
        label: "Aseri",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Client/FreshFood",
        label: "FreshFood",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Client/Ps",
        label: "Ps",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Client/Eaps",
        label: "Eabs",
        icon: <Database className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Client/Pass",
        label: "Pass",
        icon: <Database className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Client/Pirb",
        label: "Pirb",
        icon: <ClipboardList className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Client/Crec",
        label: "Crec",
        icon: <FileText className="w-4 h-4 opacity-70" />,
      },
    ],
  },
  {
    title: "Rapports Deleguer",
    items: [
      {
        path: "/Client/Rapport",
        label: "Rapport ",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      }
    ],
  },
];

