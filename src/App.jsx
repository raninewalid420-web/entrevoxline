import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Accueil from './pages/Accueil'
import Layout from './layouts/DashboardLayout'
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



function App() {
  const role = "agent"

  return (
    <Router>
      <Routes>
        {/* Page d’accueil */}
        <Route path="/" element={<Accueil />} />

        {/* Dashboard principal */}
        <Route
          path="/dashboard"
          element={
            <Layout role={role}>
              <h1 className="text-2xl font-bold text-blue-900">
                Bienvenue sur le Dashboard 🎉
              </h1>
            </Layout>
          }
        />

        {/* ✅ Route ADR */}
        <Route
          path="/dashboard/adr"
          element={
            <Layout role={role}>
              <Adr />
            </Layout>
          }
        />
        <Route
          path="/adr"
          element={
            <Layout role={role}>
              <Adr />
            </Layout>
          }
        />
        {/* route de listes des agents */}
        <Route
          path="/agents"
          element={
            <Layout role={role}>
              <Agents />
            </Layout>
          }
        />
        {/* Route Cartin */}
        <Route
          path="/cartin"
          element={
            <Layout role={role}>
              <CartinData />
            </Layout>
          }
        />
        {/* route pour la page recherche */}
        <Route
          path="/recherche"
          element={
            <Layout role={role}>
              <Recherche />
            </Layout>
           }
           />
           {/* route de arulos */}
        <Route
          path="/Arulos"
          element={
            <Layout role={role}>
              <Arulos />
            </Layout>
           }
           />
           {/* route eab */}
        <Route
          path="/EAB"
          element={
            <Layout role={role}>
              <EAB />
            </Layout>
           }
           />
           {/* route de dpcr */}
        <Route
          path="/DPCR"
          element={
            <Layout role={role}>
              <DPCR />
            </Layout>
           }
           />
           {/* route information.jsx */}
        <Route
          path="/InformationData"
          element={
            <Layout role={role}>
              <InformationData />
            </Layout>
           }
           />
           {/* route commande annuler */}
        <Route
          path="/CommandeannulerData"
          element={
            <Layout role={role}>
              <CommandeannulerData/>
            </Layout>
           }
           />
           {/* route de colis non trouver */}
        <Route
          path="/ColisNontrouverData"
          element={
            <Layout role={role}>
              <ColisNontrouverData/>

            </Layout>
           }
           />
           {/* route de masse/purcsa */}
        <Route
          path="/masse/PurcsaData"
          element={
            <Layout role={role}>
              <PurcsaData/>

            </Layout>
           }
           />
           {/* route de masse/agr */}
        <Route
          path="/masse/AGR"
          element={
            <Layout role={role}>
              <AGR/>

            </Layout>
           }
           />
           {/* ROUTE ASSERI */}
        <Route
          path="/masse/Aseri"
          element={
            <Layout role={role}>
              <Aseri/>

            </Layout>
           }
           />
          {/* route CREC */}
        <Route
          path="/masse/Crec"
          element={
            <Layout role={role}>
              <Crec/>


            </Layout>
           }
           />
           {/* route EAB */}
        <Route
          path="/masse/EABData"
          element={
            <Layout role={role}>
              <EABData/>


            </Layout>
           }
           />
           {/* FREESH FOOD */}
        <Route
          path="/masse/FreeshData"
          element={
            <Layout role={role}>
              <FreeshData/>


            </Layout>
           }
           />
           {/* route PASS */}
        <Route
          path="/masse/PassData"
          element={
            <Layout role={role}>
              <PassData/>


            </Layout>
           }
           />
           {/* route pirb */}
        <Route
          path="/masse/PirbData"
          element={
            <Layout role={role}>
              <PirbData/>


            </Layout>
           }
           />
           {/* route PS */}
        <Route
          path="/masse/PsData"
          element={
            <Layout role={role}>
              <PsData/>


            </Layout>
           }
           />
           {/* route Hors_projet */}
        <Route
          path="/masse/HsData"
          element={
            <Layout role={role}>
              <HsData/>


            </Layout>
           }
           />
      
           
           </Routes>
     

    </Router>
  )
}

export default App
