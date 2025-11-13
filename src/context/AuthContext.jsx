import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuth, loginUser, LogoutUser } from "../api/users";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // état initial

  // ✅ Vérifie la session à chaque refresh
  useEffect(() => {
    console.log("🟢 AuthContext mounted — vérification de session...");

    const verifySession = async () => {
      try {
        console.log("📡 Appel de checkAuth...");
        const data = await checkAuth();
        console.log("✅ Réponse checkAuth:", data);

        if (data.auth && data.user) {
          setUser(data.user);
          console.log("👤 Session vérifiée avec succès:", data.user);
        } else {
          console.log("⚠️ Session invalide ou expirée");
          setUser(null);
        }
      } catch (error) {
        console.error("🚨 Erreur de vérification:", error);
        setUser(null);
      } finally {
        setLoading(false);
        console.log("⏳ Vérification terminée");
      }
    };

    verifySession();
  }, []);

  const login = async (email, password) => {
    const userData = await loginUser(email, password);
    setUser(userData);
    return userData;
  };

  const logout = async () => {
    await LogoutUser();
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
