import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import centreAppel from "./images/centre appel.avif";
import loginImage from "./images/login-side.jpg";
import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";
import { useAuth } from "./context/AuthContext";

export default function Accueil() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login(email, password);

      // Redirection selon le rôle
      const redirectByRole = {
        superAdmin: "/dashboard",
        admin: "/dashboard",
        chefCentre: "/dashboard",
        agents: "/Agents/dashboard",
        clients: "/Client/Purcsa",
      };
      navigate(redirectByRole[user.role] || "/dashboard");
      setOpen(false);
    } catch (err) {
      setError(err.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${centreAppel})` }}
    >
      <div
        className={`min-h-screen flex flex-col transition-all duration-300 ${
          open ? "backdrop-blur-sm" : ""
        } bg-black/50`}
      >
        <header className="w-full flex justify-between items-center px-10 py-6">
          <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">
            📞 CallManager
          </h1>
          <Button
            className="bg-[#0B1F3A] hover:bg-[#142f63] text-white font-semibold px-6 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105"
            onClick={() => setOpen(true)}
          >
            Connexion
          </Button>
        </header>

        <main className="flex-1 flex items-center">
          <div className="max-w-3xl px-10 text-left">
            <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
              Gérez vos appels <br /> de manière plus simple et rapide
            </h2>
            <p className="mt-6 text-lg text-gray-200 max-w-xl leading-relaxed drop-shadow">
              Optimisez le travail de vos agents et améliorez la satisfaction de
              vos clients avec notre plateforme intuitive et performante.
            </p>
          </div>
        </main>
      </div>

      {/* ---- Dialog ---- */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg p-0 overflow-hidden rounded-2xl shadow-2xl border-0">
          <div className="w-full">
            {/* <div
              className="hidden md:block bg-cover bg-center"
              style={{
                backgroundImage: `url(${loginImage})`,
              }}
            ></div> */}

            <div className="bg-white p-8 md:p-10 flex flex-col justify-center">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-3xl font-bold text-[#0B1F3A] text-center">
                  Connexion
                </DialogTitle>
                <p className="text-gray-500 text-center mt-1 text-sm">
                  Connectez-vous à votre espace de gestion
                </p>
              </DialogHeader>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemple@domaine.com"
                    required
                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#0B1F3A] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#0B1F3A] outline-none"
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-sm font-medium text-center">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0B1F3A] hover:bg-[#142f63] cursor-pointer text-white font-medium px-4 py-2 rounded-md shadow-md flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5" />
                      Connexion...
                    </>
                  ) : (
                    "Se connecter"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
