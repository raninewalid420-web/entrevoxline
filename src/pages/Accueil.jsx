import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import centreAppel from "../images/centre appel.avif"
import { useNavigate } from "react-router-dom"

export default function Accueil() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  //  Comptes de test simulés
  const users = [
    {
      email: "testadmin@gmail.com",
      password: "123***",
      role: "admin",
      redirect: "/dashboard",
    },
    {
      email: "testagent@gmail.com",
      password: "123***",
      role: "agent",
      redirect: "/agent/dashboard",
    },
    {
      email: "testagentmass@gmail.com",
      password: "123***",
      role: "agentMass",
      redirect: "/agentmass/dashboard",
    },
    {
      email: "testsup@gmail.com",
      password: "123***",
      role: "superviseur",
      redirect: "/superviseur/dashboard",
    },
  ]

  //  Vérifie les identifiants
  const handleLogin = (e) => {
    e.preventDefault()

    const user = users.find(
      (u) => u.email === email && u.password === password
    )

    if (!user) {
      setError("Email ou mot de passe incorrect.")
      return
    }

    //  Sauvegarder les infos utilisateur (optionnel)
    localStorage.setItem("userEmail", user.email)
    localStorage.setItem("userRole", user.role)

    //  Redirection
    navigate(user.redirect)
    setOpen(false)
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${centreAppel})` }}
    >
      {/* Overlay sombre */}
      <div
        className={`min-h-screen flex flex-col transition-all duration-300 ${
          open ? "backdrop-blur-sm" : ""
        } bg-black/50`}
      >
        {/* Header */}
        <header className="w-full flex justify-between items-center px-10 py-6">
          <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">
            📞 CallManager
          </h1>

          <Button
            className="bg-[#0B1F3A] hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105"
            onClick={() => setOpen(true)}
          >
            Connexion
          </Button>
        </header>

        {/* Section Hero */}
        <main className="flex-1 flex items-center">
          <div className="max-w-3xl px-10 text-left">
            <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
              Gérez vos appels <br /> de manière plus simple et rapide
            </h2>

            <p className="mt-6 text-lg text-gray-200 max-w-xl leading-relaxed drop-shadow">
              Optimisez le travail de vos agents et améliorez la satisfaction de vos clients
              avec notre plateforme intuitive et performante.
            </p>
          </div>
        </main>
      </div>

      {/* ---- Dialog ---- */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md rounded-xl p-6 bg-white shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-blue-900">
              Connexion
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleLogin} className="space-y-4 mt-4">
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
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
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
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm font-medium text-center">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md shadow-md"
            >
              Se connecter
            </Button>
          </form>

        </DialogContent>
      </Dialog>
    </div>
  )
}
