"use client"

import { DataTable } from "../components/dataTables/data-table"
import { Aruloscolumns } from "../components/dataTables/columnarulos"

const arData = [
  {
    id: 1,
    nom: "Dupont Jean",
    telephone: "0612345678",
    logement: "A101",
    type: "Résidentiel",
    projet: "Projet Alpha",
    quartier: "Nord",
    equipement: "Climatisation",
    affectation: "Maintenance",
    commentaire: "Vérifier chauffage",
    facture: "F12345",
    enregistrePar: "Admin",
    dateCreation: "2025-10-19",
    chefDeChantier: "Pierre Martin",
  },
  {
    id: 2,
    nom: "Martin Claire",
    telephone: "0698765432",
    logement: "B202",
    type: "Commercial",
    projet: "Projet Beta",
    quartier: "Sud",
    equipement: "Ascenseur",
    affectation: "Installation",
    commentaire: "Besoin manuel",
    facture: "F12346",
    enregistrePar: "Admin",
    dateCreation: "2025-10-18",
    chefDeChantier: "Luc Durand",
  },
]

export default function Arulos() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 py-8 w-full">
      <div className="w-[90%] mx-25">
        {/* Header avec badge */}
        <div className="mb-8">
         
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Gestion des Logements et Interventions ARULOS
          </h1>
          <p className="text-slate-600 text-lg">
            Suivi des projets, interventions et affectations des équipements
          </p>
        </div>

        {/* Tableau principal */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5">
            <h2 className="text-xl font-semibold text-white">
              Registre des interventions ARULOS
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Liste complète des opérations enregistrées
            </p>
          </div>
          <div className="p-6">
            <DataTable columns={Aruloscolumns} data={arData} />
          </div>
        </div>
      </div>
    </div>
  )
}
