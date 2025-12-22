import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ allowedRoles }) {
  const { user, isAuthenticated, loading } = useAuth();

  // ⏳ Attendre la vérification de session
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  // ❌ Pas connecté
  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  // 🚫 Rôle non autorisé
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const homeByRole = {
      superAdmin: "/dashboard",
      admin: "/dashboard",
      chefCentre: "/dashboard",
      equipe_qualiter: "/Equipe_Qualiter/dashboard",
      agents: "/Agents/mass",
      clients: "/Client/Dashboard",
    };

    return <Navigate to={homeByRole[user.role]} replace />;
  }

  // ✅ Accès autorisé
  return <Outlet />;
}
