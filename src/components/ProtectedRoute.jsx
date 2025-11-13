import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ allowedRoles}) {
  const { user, isAuthenticated } = useAuth();
  // console.log("ProtectedRoute - user:", user, "isAuthenticated:", isAuthenticated);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // Si l'utilisateur essaie d'accéder à une route qui n’est pas la sienne
    const homeByRole = {
      superAdmin: "/dashboard",
      admin: "/dashboard",
      chefCentre: "/dashboard",
      agents: "/Agents/mass",
      clients: "/Client/Purcsa",
    };
    return <Navigate to={homeByRole[user?.role]}  />;
  }

  return <Outlet />;
}
