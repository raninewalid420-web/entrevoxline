import { Outlet } from "react-router-dom";
import SidebarMenu from "../components/sideBarMenu";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { useAuth } from "../context/AuthContext";
import { AffecterProvider } from "../context/AffecterContext";

export default function Layout({ menuItems = [] }) {
  const { user, isAuthenticated } = useAuth();

  // Fonction pour générer avatar initials
  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <SidebarProvider>
      <AffecterProvider>
        <SidebarMenu menuItems={menuItems} />
        <main className="w-full overflow-x-hidden relative pt-10">
          <SidebarTrigger className="fixed z-50" />

          {/* 🔥 Header fixe (nom utilisateur + avatar) */}
          <div className="absolute w-full flex justify-end px-10 items-center h-10 bg-white shadow-2xl top-0">
            {isAuthenticated && user && (
              <div className="flex items-center gap-3">
                {/* Avatar rond */}
                <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-sm font-bold">
                  {getInitials(user.name)}
                </div>

                {/* Nom utilisateur */}
                <span className="text-slate-700 font-medium text-sm">
                  {user.name}
                </span>
              </div>
            )}
          </div>

          <Outlet />
        </main>
      </AffecterProvider>
    </SidebarProvider>
  );
}
