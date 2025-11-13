import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ allowedRoles, redirectTo = "/" }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // Si l'utilisateur essaie d'accéder à une route qui n’est pas la sienne
    const homeByRole = {
      superAdmin: "/dashboard",
      admin: "/dashboard",
      superviseur: "/dashboard",
      agent: "/Agents/dashboard",
      client: "/Client/Purcsa",
    };
    return <Navigate to={homeByRole[user?.role] || "/"} replace />;
  }

  return <Outlet />;
}
