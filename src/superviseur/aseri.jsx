"use client"

import { columnsaseri } from "../components/dataTables/columnaseri"
import { DataTable } from "../components/dataTables/data-table"

export const dataAseri = [
  {
    numeroPlainte: 102,
    dateSaisi: "2025-10-22",
    nom: "Mohamed Youssouf Farada",
    nomConjoint: "",
    telephone: "77172662",
    numEtudiant: "000025782007T",
    dateNaissance: "2006-12-02",
    cin: "",
    genre: "Homme",
    region: "Obock",
    commune: "",
    quartier: "",
    descriptionPlainte:
      "L'appelant est un étudiant en première année (L1) à l'Université de Djibouti. Il rencontre des difficultés liées à la plateforme D-Money pour le versement de son allocation.",
    categoryPlainte: "doleance",
    typeProbleme: "Dysfonctionnement de la plateforme D-Money",
    statusPlainte: "",
    creePar: "Fatouma Abdo",
  },
  {
    numeroPlainte: 12,
    dateSaisi: "2025-09-09",
    nom: "Abdoulkader Mohamed",
    nomConjoint: "",
    telephone: "77204592",
    numEtudiant: "905545",
    dateNaissance: "2003-07-10",
    cin: "162730",
    genre: "",
    region: "Djibouti-ville",
    commune: "Balbala",
    quartier: "T3",
    descriptionPlainte:
      "Le bénéficiaire n’a pas reçu son versement hebdomadaire via la plateforme D-Money. Il sollicite une vérification de son dossier.",
    categoryPlainte: "plainte",
    typeProbleme: "Transfert non reçu via D-Money",
    statusPlainte: "",
    creePar: "Nadira Houssein",
  },
]

export default function Aseri() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 py-8 w-full">
      <div className="w-[90%] mx-25">
        {/* Header avec badge */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="px-4 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-full">
              MASS - ASERI
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Appui Social aux Étudiants en Retrait d’Inscription (ASERI)
          </h1>
          <p className="text-slate-600 text-lg">
            Suivi et accompagnement des étudiants bénéficiaires du programme ASERI
          </p>
        </div>

        {/* Tableau principal */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5">
            <h2 className="text-xl font-semibold text-white">
              Registre des demandes étudiantes
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Liste complète des plaintes et doléances enregistrées
            </p>
          </div>
          <div className="p-6">
            <DataTable columns={columnsaseri} data={dataAseri} />
          </div>
        </div>
      </div>
    </div>
  )
}
