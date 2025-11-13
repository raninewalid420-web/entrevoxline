import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/DashboardLayout";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Suspense, lazy } from "react";


// 🌐 Page publique
const Accueil = lazy(() => import("./Accueil"));

// Superviseur/Admin/SuperAdmin pages
const Adr = lazy(() => import("./superviseur/adr"));
const Agents = lazy(() => import("./superviseur/agents"));
const CartinData = lazy(() => import("./superviseur/cartin"));
const Recherche = lazy(() => import("./superviseur/recherche"));
const Arulos = lazy(() => import("./superviseur/arulos"));
const EAB = lazy(() => import("./superviseur/EAB"));
const InformationData = lazy(() => import("./superviseur/information"));
const CommandeannulerData = lazy(() => import("./superviseur/annulationcommande"));
const ColisNontrouverData = lazy(() => import("./superviseur/colis-nontrouver"));
const PurcsaData = lazy(() => import("./superviseur/purcsa"));
const AGR = lazy(() => import("./superviseur/agr"));
const { DPCR } = lazy(() => import("./superviseur/dpcr"));
const Aseri = lazy(() => import("./superviseur/aseri"));
const Crec = lazy(() => import("./superviseur/crec"));
const EABData = lazy(() => import("./superviseur/eabmasse"));
const FreeshData = lazy(() => import("./superviseur/freeshfood"));
const PassData = lazy(() => import("./superviseur/pass"));
const PirbData = lazy(() => import("./superviseur/pirb"));
const PsData = lazy(() => import("./superviseur/ps"));
const HsData = lazy(() => import("./superviseur/horsprojet"));

// ClientMass pages
const AgrClient = lazy(() => import("./ClientMass/Agr"));
const PurcsaClient = lazy(() => import("./ClientMass/Purcsa"));
const FreshFood = lazy(() => import("./ClientMass/FreshFood"));
const Ps = lazy(() => import("./ClientMass/Ps"));
const Eaps = lazy(() => import("./ClientMass/Eaps"));
const Pass = lazy(() => import("./ClientMass/Pass"));
const Pirb = lazy(() => import("./ClientMass/Pirb"));
const Crecs = lazy(() => import("./ClientMass/Crec"));
const Aseris = lazy(() => import("./ClientMass/Aseri"));
const Rapport = lazy(() => import("./ClientMass/Rapport"));

//Agents pages 

const AdrForm = lazy(() => import("./Agent/AdrAgent"));
const DPCRForm = lazy(() => import("./Agent/dpcrAgent"));
const EABAgent = lazy(() => import("./Agent/eabAgent"));
const ArulosForm = lazy(() => import("./Agent/arulosAgent"));
const Cartinagent = lazy(() => import("./Agent/cartinAgent"));
const AnnulationCommande = lazy(() => import("./Agent/annulationAgent"));
const  InformationAgent = lazy(() => import("./Agent/inforAgent"));
const MassAgent = lazy(() => import("./Agent/massagent"));


// Menu data
import { menuData, menuDataforagents, menuDataforClientMass } from "./menuData";



export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<div className="text-center mt-20 text-blue-600 font-bold">Chargement...</div>}>
          <Routes>
            {/* 🌐 Page publique */}
            <Route path="/" element={<Accueil />} />

            {/* 🔒 Routes Superviseur / Admin / SuperAdmin */}
            <Route element={<ProtectedRoute allowedRoles={["superAdmin", "admin", "superviseur"]} />}>
              <Route element={<Layout role="superviseur" menuItems={menuData} />}>
                <Route path="/dashboard" element={<h1 className="text-2xl font-bold text-blue-900">Bienvenue sur le Dashboard 🎉</h1>} />
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

                {/* Section Masse */}
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
            </Route>

            {/* 🔒 Routes Agents */}
            <Route element={<ProtectedRoute allowedRoles={["agent"]} />}>
              <Route element={<Layout role="agent" menuItems={menuDataforagents} />}>
                <Route path="/Agents/adr" element={<AdrForm />} />
                <Route path="/Agents/mass" element={<MassAgent />} />
                <Route path="/Agents/cartin" element={<Cartinagent />} />
                <Route path="/Agents/recherche" element={<Recherche />} />
                <Route path="/Agents/Arulos" element={<ArulosForm />} />
                <Route path="/Agents/EAB" element={<EABAgent/>} />
                <Route path="/Agents/DPCR" element={<DPCRForm />} />
                <Route path="/Agents/InformationData" element={<InformationAgent />} />
                <Route path="/Agents/commandeannulerData" element={<AnnulationCommande />} />
              </Route>
            </Route>

            {/* 🔒 Routes Client Mass */}
            <Route element={<ProtectedRoute allowedRoles={["client"]} />}>
              <Route element={<Layout role="client" menuItems={menuDataforClientMass} />}>
                <Route path="/Client/Purcsa" element={<PurcsaClient />} />
                <Route path="/Client/Agr" element={<AgrClient />} />
                <Route path="/Client/Aseri" element={<Aseris />} />
                <Route path="/Client/FreshFood" element={<FreshFood />} />
                <Route path="/Client/Ps" element={<Ps />} />
                <Route path="/Client/Eaps" element={<Eaps />} />
                <Route path="/Client/Pass" element={<Pass />} />
                <Route path="/Client/Pirb" element={<Pirb />} />
                <Route path="/Client/Crec" element={<Crecs />} />
                <Route path="/Client/Rapport" element={<Rapport />} />
              </Route>
            </Route>
            {/* 🔒 Routes Agents */}
            <Route element={<ProtectedRoute allowedRoles={["Agents"]} />}>
              <Route element={<Layout role="Agents" menuItems={menuDataforClientMass} />}>
                {/* <Route path="/Agents/Adr" element={<AdrForm />} /> */}
                <Route path="/Agents/Agr" element={<AgrClient />} />
                <Route path="/Agents/Aseri" element={<Aseris />} />
                <Route path="/Agents/FreshFood" element={<FreshFood />} />
                <Route path="/Agents/Ps" element={<Ps />} />
                <Route path="/Agents/Eaps" element={<Eaps />} />
                <Route path="/Agents/Pass" element={<Pass />} />
                <Route path="/Agents/Pirb" element={<Pirb />} />
                <Route path="/Agents/Crec" element={<Crecs />} />
                <Route path="/Agents/Rapport" element={<Rapport />} />
              </Route>
            </Route>

            {/* ❌ Route non trouvée */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
}
