// import React, { useState } from "react"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

// export default function Login() {
//   // États
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState("")

//   // Comptes utilisateurs simulés
//   const users = [
//     { email: "agent1@callmanager.com", password: "123", role: "agent" },
//     { email: "admin@callmanager.com", password: "123", role: "admin" },
//     { email: "sup1@callmanager.com", password: "123", role: "superviseur" },
//     { email: "masse1@callmanager.com", password: "123", role: "masse" },
//   ]

//   // Simulation de connexion
//   const handleLogin = (e) => {
//     e.preventDefault()

//     if (!email || !password) {
//       setError("Veuillez remplir tous les champs.")
//       return
//     }

//     const user = users.find(
//       (u) => u.email === email && u.password === password
//     )

//     if (!user) {
//       setError("Email ou mot de passe incorrect.")
//       return
//     }

//     setError("")
//     alert(`Connexion réussie ✅\nBienvenue ${user.role}`)

//     // Redirection selon le rôle
//     switch (user.role) {
//       case "agent":
//         window.location.href = "/dashboard/agent"
//         break
//       case "admin":
//         window.location.href = "/dashboard/admin"
//         break
//       case "superviseur":
//         window.location.href = "/dashboard/superviseur"
//         break
//       case "masse":
//         window.location.href = "/dashboard/masse"
//         break
//       default:
//         window.location.href = "/"
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
//       <Card className="w-full max-w-md shadow-xl border border-gray-200">
//         <CardHeader>
//           <CardTitle className="text-3xl font-bold text-center text-blue-900">
//             Connexion
//           </CardTitle>
//           <p className="text-sm text-center text-gray-500">
//             Veuillez entrer vos identifiants
//           </p>
//         </CardHeader>

//         <CardContent>
//           {error && (
//             <div className="mb-4 text-red-600 text-sm bg-red-100 p-2 rounded">
//               {error}
//             </div>
//           )}
//           <form onSubmit={handleLogin} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <Input
//                 type="email"
//                 placeholder="exemple@entreprise.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="mt-1"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Mot de passe
//               </label>
//               <Input
//                 type="password"
//                 placeholder="********"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="mt-1"
//               />
//             </div>

//             <Button
//               type="submit"
//               className=" w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105"
//             >
//               Se connecter
//             </Button>
//           </form>
//         </CardContent>

//         <CardFooter className="flex justify-center">
//           <p className="text-xs text-gray-500">
//             © {new Date().getFullYear()} CallManager
//           </p>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }
