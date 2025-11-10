import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Home,
  Users,
  ChevronDown,
  ChevronRight,
  LogOut,
  Layers,
  FolderKanban,
} from "lucide-react";

export default function SidebarMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMasseOpen, setIsMasseOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const masseItems = [
    { path: "/masse/PurcsaData", label: "PURCSA" },
    { path: "/masse/AGR", label: "AGR" },
    { path: "/masse/Aseri", label: "ASERI" },
    { path: "/masse/Crec", label: "CREC" },
    { path: "/masse/EABData", label: "EAPS" },
    { path: "/masse/FreeshData", label: "Freesh Food" },
    { path: "/masse/PassData", label: "Pass" },
    { path: "/masse/PirbData", label: "PIRB" },
    { path: "/masse/PsData", label: "Ps" },
    { path: "/masse/HsData", label: "Hors Projet " },
  ];

  const autresItems = [
    { path: "/adr", label: "ADR" },
    { path: "/cartin", label: "Cartin" },
    { path: "/recherche", label: "Recherche" },
    { path: "/Arulos", label: "Arulos" },
    // { path: "/saba-bank", label: "Saba Bank" },
    { path: "/EAB", label: "EAB Bank" },
    { path: "/DPCR", label: "DPCR" },
    { path: "/commandeannulerData", label: "Annulation commande" },
    { path: "/ColisNontrouverData", label: "Colis non trouvé" },
    {path :"/InformationData", label:"information"},
  ];

  return (
    <Sidebar className="w-64 min-h-screen bg-[#0B1F3A] text-gray-200 flex flex-col shadow-lg rounded-r-3xl">
      {/* HEADER */}
      <SidebarHeader className="border-b border-white/10 p-5 bg-[#0B1F3A]">
        <h1 className="text-lg font-bold text-white tracking-wide text-center flex items-center justify-center gap-2">
          📞 <span className="text-blue-200">CallManager</span>
        </h1>
      </SidebarHeader>

      {/* CONTENT */}
     <SidebarContent className="flex-1 p-4 space-y-4 overflow-y-auto hide-scrollbar overflow-x-hidden bg-[#0B1F3A]">

        {/* NAVIGATION */}
        <SidebarGroup>
          <p className="text-xs text-gray-400 uppercase font-semibold mb-2 tracking-wider">
            Navigation
          </p>
          <div className="space-y-1">
            {[
              { path: "/dashboard", label: "Tableau de bord", icon: <Home className="w-4 h-4" /> },
              { path: "/agents", label: "Liste des agents", icon: <Users className="w-4 h-4" /> },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-white text-[#0B1F3A] shadow-sm"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </SidebarGroup>

        <SidebarSeparator className="border-white/10" />

        {/* MASSE avec sous-menu */}
        <SidebarGroup>
          <button
            onClick={() => setIsMasseOpen(!isMasseOpen)}
            className="flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:bg-white/10 transition-all"
          >
            <span className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-gray-300" /> Masse
            </span>
            {isMasseOpen ? (
              <ChevronDown className="w-4 h-4 text-gray-300" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-300" />
            )}
          </button>

          {isMasseOpen && (
            <div className="mt-2 ml-5 space-y-1 border-l border-white/10 pl-3">
              {masseItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                    location.pathname === item.path
                      ? "bg-white text-[#0B1F3A] shadow-sm"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </SidebarGroup>

        <SidebarSeparator className="border-white/10" />

        {/* AUTRES */}
        <SidebarGroup>
          <p className="text-xs text-gray-400 uppercase font-semibold mb-2 tracking-wider">
            Autres
          </p>
          <div className="space-y-1">
            {autresItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-white text-[#0B1F3A] shadow-sm"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <FolderKanban className="w-4 h-4 opacity-70" />
                {item.label}
              </Link>
            ))}
          </div>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="border-t border-white/10 p-4 bg-[#0B1F3A]">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-white/10 hover:bg-white/20 py-2 text-gray-100 font-medium transition-all shadow-sm"
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
