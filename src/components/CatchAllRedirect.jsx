import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function CatchAllRedirect() {
  const { user, isAuthenticated } = useAuth();

  const homeByRole = {
    superAdmin: "/dashboard",
    admin: "/dashboard",
    chefCentre: "/dashboard",
    equipe_qualiter: "/Equipe_Qualiter/dashboard",
    agents: "/Agents/mass",
    clients: "/Client/Dashboard",
  };

  // 🔒 Si connecté → le renvoyer vers sa page d’accueil
  if (isAuthenticated && user?.role) {
    return <Navigate to={homeByRole[user.role] || "/"} replace />;
  }

  // 🌐 Sinon (non connecté) → rediriger vers la page publique
  return <Navigate to="/" replace />;
}
