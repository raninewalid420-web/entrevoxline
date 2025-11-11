// App.tsx
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layouts/DashboardLayout'

// Import groupé des pages (facile à maintenir)
import Adr from './superviseur/adr'
import Agents from './superviseur/agents'
import CartinData from './superviseur/cartin'
import Recherche from './superviseur/recherche'
import Arulos from './superviseur/arulos'
import EAB from './superviseur/EAB'
import InformationData from './superviseur/information'
import CommandeannulerData from './superviseur/annulationcommande'
import ColisNontrouverData from './superviseur/colis-nontrouver'
import PurcsaData from './superviseur/purcsa'
import AGR from './superviseur/agr'
import { DPCR } from './superviseur/dpcr'
import Aseri from './superviseur/aseri'
import Crec from './superviseur/crec'
import EABData from './superviseur/eabmasse'
import FreeshData from './superviseur/freeshfood'
import PassData from './superviseur/pass'
import PirbData from './superviseur/pirb'
import PsData from './superviseur/ps'
import HsData from './superviseur/horsprojet'
import Accueil from './Accueil'
import {
  Home,
  Users,
  Layers,
  FolderKanban,
  Database,
  ClipboardList,
  FileText,
} from "lucide-react";

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
          { path: "/masse/EABData", label: "EAPS" },
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
      { path: "/adr", label: "ADR", icon: <FolderKanban className="w-4 h-4 opacity-70" /> },
      { path: "/cartin", label: "Cartin", icon: <FolderKanban className="w-4 h-4 opacity-70" /> },
      { path: "/recherche", label: "Recherche", icon: <FolderKanban className="w-4 h-4 opacity-70" /> },
      { path: "/Arulos", label: "Arulos", icon: <FolderKanban className="w-4 h-4 opacity-70" /> },
      { path: "/EAB", label: "EAB Bank", icon: <Database className="w-4 h-4 opacity-70" /> },
      { path: "/DPCR", label: "DPCR", icon: <Database className="w-4 h-4 opacity-70" /> },
      { path: "/commandeannulerData", label: "Annulation commande", icon: <ClipboardList className="w-4 h-4 opacity-70" /> },
      { path: "/ColisNontrouverData", label: "Colis non trouvé", icon: <FileText className="w-4 h-4 opacity-70" /> },
      { path: "/InformationData", label: "Information", icon: <FileText className="w-4 h-4 opacity-70" /> },
    ],
  },
];


export const menuDataforagents = [
 {
    title: "Navigation",
    items: [
      { path: "/Agents/mass", label: "Mass", icon: <FolderKanban className="w-4 h-4 opacity-70" /> },
      { path: "/Agents/adr", label: "ADR", icon: <FolderKanban className="w-4 h-4 opacity-70" /> },
      { path: "/Agents/cartin", label: "Cartin", icon: <FolderKanban className="w-4 h-4 opacity-70" /> },
      { path: "/Agents/recherche", label: "Recherche", icon: <FolderKanban className="w-4 h-4 opacity-70" /> },
      { path: "/Agents/Arulos", label: "Arulos", icon: <FolderKanban className="w-4 h-4 opacity-70" /> },
      { path: "/Agents/EAB", label: "EAB Bank", icon: <Database className="w-4 h-4 opacity-70" /> },
      { path: "/Agents/DPCR", label: "DPCR", icon: <Database className="w-4 h-4 opacity-70" /> },
      { path: "/Agents/commandeannulerData", label: "Annulation commande", icon: <ClipboardList className="w-4 h-4 opacity-70" /> },
      { path: "/Agents/InformationData", label: "Information", icon: <FileText className="w-4 h-4 opacity-70" /> },
    ],
  },
];


// Tu pourras remplacer ça par le vrai rôle depuis ton AuthContext
const role = localStorage.getItem('userRole') || 'agent'



export default function App() {
  return (
    <Router>
      <Routes>
        {/* 🌐 Page publique */}
        <Route path="/" element={<Accueil />} />

        {/* 🔒 Toutes les routes protégées sous le même layout pour le superveur */}
        <Route element={<Layout role={role} menuItems={menuData} />}>
          {/* Tableau de bord principal */}
          <Route
            path="/dashboard"
            element={
              <h1 className="text-2xl font-bold text-blue-900">
                Bienvenue sur le Dashboard 🎉
              </h1>
            }
          />

          {/* ✅ Routes principales */}
          <Route path="/dashboard/adr" element={<Adr />} />
          <Route path="/adr" element={<Adr />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/cartin" element={<CartinData />} />
          <Route path="/recherche" element={<Recherche />} />
          <Route path="/Arulos" element={<Arulos />} />
          <Route path="/EAB" element={<EAB />} />
          <Route path="/DPCR" element={<DPCR />} />
          <Route path="/InformationData" element={<InformationData />} />
          <Route path="/CommandeannulerData" element={<CommandeannulerData />} />
          <Route path="/ColisNontrouverData" element={<ColisNontrouverData />} />

          {/* 📦 Section “masse” */}
          <Route path="/masse/PurcsaData" element={<PurcsaData />} />
          <Route path="/masse/AGR" element={<AGR />} />
          <Route path="/masse/Aseri" element={<Aseri />} />
          <Route path="/masse/Crec" element={<Crec />} />
          <Route path="/masse/EABData" element={<EABData />} />
          <Route path="/masse/FreeshData" element={<FreeshData />} />
          <Route path="/masse/PassData" element={<PassData />} />
          <Route path="/masse/PirbData" element={<PirbData />} />
          <Route path="/masse/PsData" element={<PsData />} />
          <Route path="/masse/HsData" element={<HsData />} />
        </Route>
        {/* 🔒 Toutes les routes protégées sous le même layout pour les agents */}
        <Route element={<Layout role={role} menuItems={menuDataforagents} />}>
          {/* Tableau de bord principal */}
          <Route
            path="/Agents/dashboard"
            element={
              <h1 className="text-2xl font-bold text-blue-900">
                Bienvenue sur le Dashboard 🎉
              </h1>
            }
          />

          {/* ✅ Routes pours les agents */}
          <Route path="/dashboard/adr" element={<Adr />} />
        </Route>
      </Routes>
    </Router>
  )
}