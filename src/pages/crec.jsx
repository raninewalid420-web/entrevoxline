"use client"

import { columnscrec } from "../components/dataTables/columncrec"
import { DataTable } from "../components/dataTables/data-table"

export const dataCrec = [
  {
    numeroPlainte: 104,
    dateSaisi: "2025-10-23",
    nom: "Amina Osman Mohamed",
    nomConjoint: "Houssein Mohamed",
    telephone: "77026601",
    dateNaissance: "1974-10-27",
    cin: "",
    genre: "Homme",
    region: "Tadjourah",
    localite: "Randa",
    descriptionPlainte:
      "La bénéficiaire demande une aide pour relancer sa boutique, qui a fait faillite suite à des difficultés économiques.",
    information: "Mohamed Ali Issa",
    nomDeleguer: "Mohamed Ali Issa",
    typePlainte: "doleance",
    typeProbleme:
      "Renforcement et accompagnement d'un groupement existant (transformation en CREC)",
    creePar: "Mariam Youssouf Abdallah",
  },
  {
    numeroPlainte: 97,
    dateSaisi: "2025-10-22",
    nom: "Raisso Moussa Eleyeh",
    nomConjoint: "",
    telephone: "77043353",
    dateNaissance: "2004-11-28",
    cin: "5462",
    genre: "Femme",
    region: "Ali-Sabieh",
    localite: "Ali-Addeh",
    descriptionPlainte:
      "La cliente souhaite obtenir un appui pour un magasin électronique ou pour un magasin de vêtements.",
    information: "Harbi Sabrieh Darar",
    nomDeleguer: "Harbi Sabrieh Darar",
    typePlainte: "doleance",
    typeProbleme:
      "Appui à l'accès et à l'accompagnement pour le CREC",
    creePar: "Saharla Osman Rirach",
  },
]

export default function Crec() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header avec badge */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="px-4 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-full">
              MASS - CREC
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Centres Ruraux d’Épargne et de Crédit (CREC)
          </h1>
          <p className="text-slate-600 text-lg">
            Accompagnement et suivi des groupements pour l’accès aux services financiers ruraux
          </p>
        </div>

        {/* Tableau principal */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5">
            <h2 className="text-xl font-semibold text-white">
              Registre des demandes CREC
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Suivi des doléances et appuis aux bénéficiaires ruraux
            </p>
          </div>
          <div className="p-6">
            <DataTable columns={columnscrec} data={dataCrec} />
          </div>
        </div>
      </div>
    </div>
  )
}
