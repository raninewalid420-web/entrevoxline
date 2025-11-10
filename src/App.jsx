// App.tsx
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Accueil from './pages/Accueil'
import Layout from './layouts/DashboardLayout'

// Import groupé des pages (facile à maintenir)
import Adr from './pages/adr'
import Agents from './pages/agents'
import CartinData from './pages/cartin'
import Recherche from './pages/recherche'
import Arulos from './pages/arulos'
import EAB from './pages/EAB'
import InformationData from './pages/information'
import CommandeannulerData from './pages/annulationcommande'
import ColisNontrouverData from './pages/colis-nontrouver'
import PurcsaData from './pages/purcsa'
import AGR from './pages/agr'
import { DPCR } from './pages/dpcr'
import Aseri from './pages/aseri'
import Crec from './pages/crec'
import EABData from './pages/eabmasse'
import FreeshData from './pages/freeshfood'
import PassData from './pages/pass'
import PirbData from './pages/pirb'
import PsData from './pages/ps'
import HsData from './pages/horsprojet'

// Tu pourras remplacer ça par le vrai rôle depuis ton AuthContext
const role = localStorage.getItem('userRole') || 'agent'

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 🌐 Page publique */}
        <Route path="/" element={<Accueil />} />

        {/* 🔒 Toutes les routes protégées sous le même layout */}
        <Route element={<Layout role={role} />}>
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
      </Routes>
    </Router>
  )
}
